'use strict';

var url = require("../src/util/url");

describe('url.js >', function () {
    it('should parse unmatched url', function () {
        var parse = url.parse('/path?q=123&p=456&k=1');
        var ret = parse('/path?q=123&p=456');
        expect(ret.isMatched).toBeFalsy();
    });

    it('should parse matched url', function () {
        var parse = url.parse('/path?q=123&p=456&k=1');
        var ret = parse('/path?q=123&p=456&k=1');
        expect(ret.isMatched).toBeTruthy();
        expect(ret.urlParams).toEqual([]);
    });

    it('should parse matched url with parameters', function () {
        var parse = url.parse('/path?q={q}&p={p:[0-9]+}&k=1');
        var ret = parse('/path?q=123&p=456&k=1');
        expect(ret.isMatched).toBeTruthy();
        expect(ret.urlParams[0]).toEqual(['q', '123']);
        expect(ret.urlParams[1]).toEqual(['p', '456']);
    });

    it('should parse url with unmatched parameters', function () {
        var parse = url.parse('/path?q={q}&p={p:[a-z]+}&k=1');
        var ret = parse('/path?q=123&p=456&k=1');
        expect(ret.isMatched).toBeFalsy();
    });
});