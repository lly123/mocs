'use strict';

var diff = require("../src/util/diff");

describe('diff.js >', function () {
    it('should diff one level', function () {
        var obj1 = {
            k1: 1,
            k2: 'test',
            k3: [1],
            k4: {}
        };

        var obj2 = {
            k2: 'test',
            k3: {a: 1},
            k5: 'hello'
        };

        var ret = [];
        diff.apply('root', obj1, obj2, function (r) {
            ret.push(r);
        });

        expect(ret.length).toBe(2);
        expect(ret[0]).toEqual({objName: 'root', keys: {deletedKeys: [ 'k1', 'k4' ], addedKeys: [ 'k5' ]}});
        expect(ret[1]).toEqual({objName: 'root', keys: {typeChangedKeys: [ 'k3' ]}});
    });

    it('should diff more level', function () {
        var obj1 = {
            k1: 1,
            k2: {
                a: 1,
                b: 'hello'
            }
        };

        var obj2 = {
            k1: 'test',
            k2: {
                c: {}
            }
        };

        var ret = [];
        diff.apply('root', obj1, obj2, function (r) {
            ret.push(r);
        });

        expect(ret.length).toBe(2);
        expect(ret[0]).toEqual({"objName": "root", "keys": {"typeChangedKeys": ["k1"]}});
        expect(ret[1]).toEqual({"objName": "k2", "keys": {"deletedKeys": ["a", "b"], "addedKeys": ["c"]}});
    });
});