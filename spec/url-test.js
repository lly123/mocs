'use strict';

var url = require("../src/util/url");

describe('url.js >', function () {
    it('should parse url', function () {
        var parseResult = url.parse('/path?q={q}&p={p:[0-9]+}&k=1');
        var urlRegex = parseResult[0];
        var paraNames = parseResult[1];

        expect(urlRegex).toBe('/path\\?q=(.+)&p=([0-9]+)&k=1');
        expect(paraNames).toEqual(['q', 'p']);
    });
});