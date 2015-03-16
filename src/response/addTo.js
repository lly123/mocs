(function () {
    'use strict';

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.serverName,
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (req, res, env, rule) {
        header(env, res);

        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });

        req.on('end', function () {
            env.responseData.push({
                id: rule.response.addTo.id,
                data: rule.response.addTo.data
            });
            res.end("");
        });
    };

    module.exports.run = run;
}());
