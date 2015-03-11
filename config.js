var _ = require('underscore');
var yaml = require('js-yaml');
var fs = require('fs');

var load = function () {
    var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

    return {
        rules: function (request) {
            return _.filter(config.rules, function (rule) {
                var r = rule.request;
                var isMethodMatched = _.isEqual(request.method.toUpperCase(), r.method.toUpperCase());
                var isUrlMatched = _.isEqual(request.url.toUpperCase(), r.url.toUpperCase());
                return isMethodMatched && isUrlMatched;
            });
        },

        env: function () {
            return {
                server: config.env.server
            };
        }
    }
};

module.exports.load = load;
