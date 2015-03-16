(function () {
    'use strict';

    var _ = require('underscore');
    var http = require('http');

    var config = require('./config');
    var util = require('./util/util');
    var log = require('./util/log');
    var diff = require('./util/diff');

    var resJson = require('./response/json');
    var resSeeOther = require('./response/seeOther');
    var resFile = require('./response/file');
    var resCall = require('./response/call');

    var globalConfig;

    var server = http.createServer(function (request, response) {
        _.compose(function (rule) {
            util.isTrue(globalConfig.env())(
                [!rule, function () {
                    response.statusCode = 404;
                    response.end();

                    log.notMatchedIncomingRequest(request);
                }],

                [rule && rule.response.json, function (rule) {
                    resJson.run(response, e, rule);
                }],

                [rule && rule.response.call, function (rule) {
                    resCall.run(request, response, e, rule,
                        rule.response.json ?
                            function (realData) {
                                diff.apply('ROOT', rule.response.json, JSON.parse(realData), function (m) {
                                    log.keyChanged(m);
                                });
                            } : undefined)
                }],

                [rule && rule.response.file, function (e) {
                    resFile.run(response, e, rule);
                }],

                [rule && rule.response.seeOther, function (e) {
                    resSeeOther.run(response, e, rule);
                }]
            );
        }, _.first, globalConfig.rules)(request);
    });

    server.listen(3000, function () {
        console.log("Server listening on port 3000.\n");
        globalConfig = config.load();
    });
}());

