(function () {
    'use strict';

    var _ = require('underscore');
    var http = require('http');
    var url = require('url');
    var param = require('../util/param');
    var util = require('../util/util');

    var header = function (env, res, newRes) {
        var headers = _.omit(newRes.headers, function (value, key) {
            return _.isEqual(key.toLowerCase(), 'server') || _.isEqual(key.toLowerCase(), 'cache-control');
        });
        headers.Server = env.serverName;
        headers['Cache-Control'] = 'no-cache';
        res.writeHead(newRes.statusCode, headers);
    };

    var generateNewRequest = function (req, rule, fn) {
        var realOriginalUrl = _.isObject(rule.response.call) ? rule.response.call.url : rule.response.call;
        var cookie = _.isObject(rule.response.call) ? rule.response.call.cookie : undefined;
        var newReq = url.parse(param.replace(rule.request.params, realOriginalUrl));

        var headers = _.omit(req.headers, function (value, key) {
            return _.isEqual(key.toLowerCase(), 'host') ||
                _.isEqual(key.toLowerCase(), 'if-none-match') ||
                _.isEqual(key.toLowerCase(), 'if-modified-since');
        });

        headers.cookie = util.mergeCookies(headers.cookie, cookie);

        fn(newReq, headers);
    };

    var run = function (req, res, env, rule) {
        generateNewRequest(req, rule, function (newReq, headers) {
            var options = {
                hostname: newReq.hostname,
                port: newReq.port || 80,
                path: newReq.path,
                method: req.method,
                headers: headers
            };

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
        });
    };

    module.exports.run = run;
}());
