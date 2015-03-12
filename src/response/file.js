(function () {
    'use strict';

    var fs = require('fs');
    var path = require('path');
    var mime = require('mime-types');
    var param = require('../util/param');

    var header = function (env, res, contentType) {
        res.writeHead(200,
            {
                'Server': env.serverName,
                'Content-Type': contentType + ';charset=UTF-8',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env, rule) {
        var filePath = param.replace(rule.request.params, rule.response.file);
        fs.readFile(filePath, function (err, content) {
            if (err) {
                res.writeHead(500);
                res.end();
            } else {
                header(env, res, mime.lookup(filePath));
                res.end(content);
            }
        });
    };

    module.exports.run = run;
}());