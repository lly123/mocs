(function () {
    'use strict';

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.serverName,
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env) {
        header(env, res);
        res.end();
    };

    module.exports.run = run;
}());
