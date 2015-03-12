(function () {
    'use strict';

    var _ = require('underscore');

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.server,
                'Content-Type': 'application/json;charset=UTF-8',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env, rule) {
        var content = JSON.stringify(rule.response.json);

        content = content.replace(/\{\{([0-9|a-z|A_Z]+)\}\}/g, function (s, v) {
            var i = _.findLastIndex(rule.request.urlParams, function (p) {
                return _.isEqual(p[0], v);
            });
            return i > -1 ? rule.request.urlParams[i][1] : "";
        });

        header(env, res);
        res.end(content);
    };

    module.exports.run = run;
}());
