(function () {
    'use strict';

    var _ = require('underscore');

    var regRepeat = function (p, f) {
        return function (v) {
            var r;
            while ((r = p.exec(v)) != null) {
                f(r);
            }
        }
    }

    var parse = function (r, url) {
        var matches = [];
        regRepeat(/\{([0-9|a-z|A_Z]+)(?:\:(.+))?\}/g, function (m) {
            matches.push(m);
            console.log('>>>', url, r, m[0], m[1], m[2], m.index);
        })(r);

        var ret = _.reduce(matches, function (s, m) {
            var nextIndex = m.index + m[0].length;
            var partialStr = s[1] + url.substring(s[0], m.index) + m[2];

            console.log('1: ', nextIndex, partialStr);

            return [nextIndex, partialStr];
        }, [0, '']);

        if (ret[0] < r.length) {
            ret[1] = ret[1] + r.substring(ret[0], r.length);
        }

        console.log('###', ret[0], r.length, ret);
    };

    module.exports.parse = parse;
}());
