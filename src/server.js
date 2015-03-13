(function () {
    'use strict';

    var _ = require('underscore');
    var http = require('http');
    var config = require('./config.js');
    var util = require('./util/util.js');

    var resJson = require('./response/json.js');
    var resSeeOther = require('./response/seeOther.js');
    var resFile = require('./response/file.js');
    var resCall = require('./response/call.js');

    var globalConfig;

    var server = http.createServer(function (request, response) {
        _.compose(function (rule) {
            util.isTrue(globalConfig.env())(
                [!rule, function () {
                    response.statusCode = 404;
                    response.end();
                }],

                [rule && rule.response.json, function (e) {
                    resJson.run(response, e, rule);
                }],

                [rule && rule.response.seeOther, function (e) {
                    resSeeOther.run(response, e, rule);
                }],

                [rule && rule.response.file, function (e) {
                    resFile.run(response, e, rule);
                }],

                [rule && rule.response.call, function (e) {
                    resCall.run(request, response, e, rule);
                }]
            );
        }, _.first, globalConfig.rules)(request);
    });

    server.listen(3000, function () {
        console.log("Server listening on port 3000.");
        globalConfig = config.load();
    });
}());

