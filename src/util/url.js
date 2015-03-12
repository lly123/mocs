(function () {
    'use strict';

    var _ = require('underscore');
    var regex = require('./regex');

    var parse = function (urlInRule, url) {
        var ret = _.reduce(regex.repeat(/\{([0-9|a-z|A_Z]+)(?:\:(.+))?\}/g)(urlInRule),
            function (s, m) {
                var nextIndex = m.index + m[0].length;
                var partialStr = s[1] + url.substring(s[0], m.index) + m[2];

                console.log('1: ', nextIndex, partialStr);

                return [nextIndex, partialStr];
            }, [0, '']);

        if (ret[0] < urlInRule.length) {
            ret[1] += urlInRule.substring(ret[0], urlInRule.length);
        }

        console.log('###', ret[0], urlInRule.length, ret);
    };

    module.exports.parse = parse;
}());
