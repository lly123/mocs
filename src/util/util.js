(function () {
    'use strict';

    var _ = require('underscore');

    var isTrue = function () {
        var args = _.toArray(arguments);
        return function () {
            _.each(arguments, function (a) {
                if (a[0]) {
                    a[1].apply(a[1], args);
                }
            });
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

    module.exports.isTrue = isTrue;
    module.exports.c1 = c1;
    module.exports.c2 = c2;
}());

