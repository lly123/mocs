'use strict';

var regex = require("../src/util/regex");

describe('regex.js >', function () {
    it('should escape the special chars', function () {
        expect(regex.escape('path?a=*')).toBe('path\\?a=\\*');
    });
});