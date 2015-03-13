(function () {
    'use strict';

    var clc = require('cli-color');

    var notMatchedIncomingRequest = function (request) {
        console.log(clc.green('METHOD: '), request.method);
        console.log(clc.green('URL: '), request.url);
        console.log(clc.green('HEADERS: '), request.headers);
        console.log(clc.yellow('\n'));
    };

    module.exports.notMatchedIncomingRequest = notMatchedIncomingRequest;
}());