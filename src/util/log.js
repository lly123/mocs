(function () {
    'use strict';

    var _ = require('underscore');
    var clc = require('cli-color');
    var pj = require('prettyjson');

    var notMatchedIncomingRequest = function (request) {
        console.log(clc.green('METHOD: '), request.method);
        console.log(clc.green('URL: '), request.url);
        console.log(clc.green('HEADER: '), request.headers);
        console.log('\n');
    };

    var callSpy = function (request, headers, body, format) {
        console.log(clc.magentaBright('METHOD: %s, URL %s'), request.method, request.url);
        console.log(clc.magentaBright('RESPONSE HEADER: '), headers);
        console.log(clc.magentaBright('RESPONSE BODY: '), body);

        if (_.isEqual('json', format)) {
            console.log(clc.magentaBright('RESPONSE JSON:'));
            console.log(pj.render(JSON.parse(body)));
        }

        console.log('\n');
    };

    var callError = function (request, err) {
        console.log(clc.red('METHOD: %s, URL %s'), request.method, request.url);
        console.log(clc.red('RESPONSE ERROR CODE: '), err.code);
        console.log('\n');
    };

    module.exports.notMatchedIncomingRequest = notMatchedIncomingRequest;
    module.exports.callSpy = callSpy;
    module.exports.callError = callError;
}());