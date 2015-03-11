(function () {
    'use strict';

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.server,
                'Content-Type': 'application/json;charset=UTF-8',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env, content) {
        header(env, res);
        res.end(JSON.stringify(content));
    };

    module.exports.run = run;
}());
