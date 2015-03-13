(function () {
    'use strict';

    var _ = require('underscore');
    var yaml = require('js-yaml');
    var fs = require('fs');
    var watch = require('node-watch');

    var url = require('./util/url');
    var util = require('./util/util');

    var loadConfig = function (fileName, success, error) {
        try {
            success(yaml.safeLoad(fs.readFileSync(fileName, 'utf8')));
        } catch (e) {
            error && error();
        }
    }

    var load = function () {
        var configFileName = 'config.yml';
        var config;

        loadConfig(configFileName, function (c) {
            config = c;
        }, function () {
            process.exit(1);
        });

        watch(configFileName, function () {
            loadConfig(configFileName, function (c) {
                console.log('Configuration has been reloaded.');
                config = c;
            });
        });

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
