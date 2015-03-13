(function () {
    'use strict';

    var _ = require('underscore');
    var http = require('http');
    var url = require('url');
    var param = require('../util/param');

    var header = function (env, res, newRes) {
        var headers = _.omit(newRes.headers, function (value, key) {
            return _.isEqual(key.toLowerCase(), 'server') || _.isEqual(key.toLowerCase(), 'cache-control');
        });
        headers['Server'] = env.serverName;
        headers['Cache-Control'] = 'no-cache';

        console.log(headers);

        res.writeHead(newRes.statusCode, headers);
    };

    var run = function (req, res, env, rule) {
        var callUrl = param.replace(rule.request.params, rule.response.call);
        var newReq = url.parse(callUrl);
        var headers = _.omit(req.headers, function (value, key) {
            return _.isEqual(key.toLowerCase(), 'host')
                || _.isEqual(key.toLowerCase(), 'if-none-match')
                || _.isEqual(key.toLowerCase(), 'if-modified-since');
        });

        var options = {
            hostname: newReq.hostname,
            port: newReq.port || 80,
            path: newReq.path,
            method: req.method,
            headers: headers
        };

        console.log(options);

        var newReqObj = http.request(options, function (r) {
            header(env, res, r);

            r.on('data', function (chunk) {
                res.write(chunk);
            });

            r.on('end', function () {
                res.end();
            });
        });

        newReqObj.on('error', function () {
            res.writeHead(500);
            res.end();
        });

        newReqObj.end();
    };

    module.exports.run = run;
}());
