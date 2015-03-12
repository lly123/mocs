(function () {
    'use strict';

    var _ = require('underscore');

    var specialChars = ['*', '.', '?', '+', '$', '^', '[', ']', '(', ')', '{', '}', '|', '\\'];

    var repeat = function (p) {
        return function (v) {
            var matches = [];
            var r;
            while ((r = p.exec(v)) !== null) {
                matches.push(r);
            }
            return matches;
        };
    };

    var escape = function (s) {
        return _.map(s.split(''), function (c) {
            return _.indexOf(specialChars, c) > -1 ? '\\' + c : c;
        }).join('');
    };

    module.exports.repeat = repeat;
    module.exports.escape = escape;
}());
