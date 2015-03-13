(function () {
    'use strict';

    var _ = require('underscore');

    var isTrue = function () {
        var args = _.toArray(arguments);
        return function () {
            _.reduce(arguments, function (s, a) {
                if (s && a[0]) {
                    a[1].apply(a[1], args);
                    return false;
                }
                return s;
            }, true);
        };
    };

    var c1 = function (fn, p1) {
        return function () {
            return fn.apply(fn, [p1].concat(_.toArray(arguments)));
        };
    };

    var c2 = function (fn, p2) {
        return function () {
            var args = _.toArray(arguments);
            return fn.apply(fn, [args[0]].concat([p2], args.slice(1)));
        };
    };

    var mergeCookies = function (c1, c2) {
        var toArray = function (c) {
            return _.reduce(c.split(';'), function (s, v) {
                s.push(_.map(v.trim().split('='), function (x) {
                    return x.trim();
                }));
                return s;
            }, []);
        };

        if (c1 && !c2) {
            return c1;
        }

        if (!c1 && c2) {
            return c2;
        }

        var o = _.object(toArray(c1).concat(toArray(c2)));

        return _.reduce(o, function (s, v, k) {
            return s + k + '=' + v + ';';
        }, "").slice(0, -1);
    };

    module.exports.isTrue = isTrue;
    module.exports.c1 = c1;
    module.exports.c2 = c2;
    module.exports.mergeCookies = mergeCookies;
}());

