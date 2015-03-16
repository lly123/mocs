(function () {
    'use strict';

    var _ = require('underscore');
    var clc = require('cli-color');
    var pj = require('prettyjson');

    var notMatchedIncomingRequest = function (request) {
        console.log(clc.magentaBright('METHOD: '), request.method);
        console.log(clc.magentaBright('URL: '), request.url);
        console.log(clc.magentaBright('HEADER: '), request.headers);
        console.log('\n');
    };

    var callSpy = function (request, headers, body, format) {
        console.log(clc.green('METHOD: %s, URL %s'), request.method, request.url);

        if (_.isEqual('sample', format) || _.isEqual('json', format)) {
            console.log(clc.green('RESPONSE HEADER: '), headers);
            console.log(clc.green('RESPONSE BODY: '), body);
        }

        if (_.isEqual('json', format)) {
            console.log(clc.green('RESPONSE JSON:'));
            console.log(pj.render(JSON.parse(body)));
        }

        console.log('\n');
    };

    var callError = function (request, err) {
        console.log(clc.red('METHOD: %s, URL %s'), request.method, request.url);
        console.log(clc.red('RESPONSE ERROR CODE: '), err.code);
        console.log('\n');
    };

    var keyChanged = function (m) {
        console.log(clc.red('API INTERFACE CHANGED:'));
        if (m.keys.addedKeys) {
            console.log(clc.red('NAME: '), m.name);
            !_.isEmpty(m.keys.addedKeys) && console.log(clc.red('  ADDED KEYS: '), m.keys.addedKeys);
            !_.isEmpty(m.keys.deletedKeys) && console.log(clc.red('  DELETED KEYS: '), m.keys.deletedKeys);
        } else {
            console.log(clc.red('NAME: '), m.name);
            console.log(clc.red('  CHANGED KEYS: '), m.keys.typeChangedKeys);
        }
        console.log('\n');
    };

    module.exports.notMatchedIncomingRequest = notMatchedIncomingRequest;
    module.exports.callSpy = callSpy;
    module.exports.callError = callError;
    module.exports.keyChanged = keyChanged;
}());