(function () {
    'use strict';

    var _ = require('underscore');
    var yaml = require('js-yaml');
    var fs = require('fs');
    var url = require('./util/url.js');
    var util = require('./util/util.js');

    var load = function () {
        var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

        return {
            rules: function (request) {
                return _.compose(
                    util.c2(_.filter, function (rule) {
                        return rule.request.isMatched;
                    }),

                    util.c2(_.map, function (rule) {
                        var r = rule.request;
                        var isMethodMatched = _.isEqual(r.method, '_') || _.isEqual(request.method.toUpperCase(), r.method.toUpperCase());
                        var matcher = url.parse(r.url)(request.url);
                        var isUrlMatched = matcher.isMatched;

                        var constants = _.chain(config.constant).map(function (v, k) {
                            return [k, v];
                        }).value() || [];

                        rule.request.isMatched = isMethodMatched && isUrlMatched;
                        rule.request.params = constants.concat(matcher.urlParams || []);
                        return rule;
                    })
                )(config.rule);
            },

            env: function () {
                return {
                    serverName: config.env.serverName
                };
            }
        };
    };

    module.exports.load = load;
}());
