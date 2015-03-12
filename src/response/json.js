(function () {
    'use strict';

    var _ = require('underscore');
    var param = require('../util/param');

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.serverName,
                'Content-Type': 'application/json;charset=UTF-8',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env, rule) {
        var content = JSON.stringify(rule.response.json);

        content = content.replace(/\{\{([0-9|a-z|A_Z]+)\}\}/g, function (s, v) {
            return param.find(rule.request.params, v);
        });

        header(env, res);
        res.end(content);
    };

    module.exports.run = run;
}());
