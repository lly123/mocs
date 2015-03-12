(function () {
    'use strict';

    var header = function (env, res, url) {
        res.writeHead(303,
            {
                'Server': env.server,
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Location': url
            });
    };

    var run = function (res, env, rule) {
        header(env, res, rule.response.seeOther);
        res.end();
    };

    module.exports.run = run;
}());
