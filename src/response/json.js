(function () {
    'use strict';

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
        header(env, res);
        res.end(param.replace(rule.request.params, JSON.stringify(rule.response.json)));
    };

    module.exports.run = run;
}());
