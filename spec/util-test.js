'use strict';

var util = require("../src/util/util");

var add = function (a, b, c, d, e) {
    return [a, b, c, d, e];
}

describe('util.js >', function () {
    it('should c1', function () {
        var f = util.c1(add, 10);
        expect(f(2, 3, 4, 5)).toEqual([10, 2, 3, 4, 5]);
    });

    it('should c2', function () {
        var f = util.c2(add, 10);
        expect(f(2, 3, 4, 5)).toEqual([2, 10, 3, 4, 5]);
    });
});