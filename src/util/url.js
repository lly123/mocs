(function () {
    'use strict';

    var _ = require('underscore');
    var regex = require('./regex');

    var parse = function (urlInRule) {
        var ret = _.reduce(regex.repeat(/\{([0-9|a-z|A_Z]+)(?:\:(.+))?\}/g)(urlInRule),
            function (s, m) {
                var nextIndex = m.index + m[0].length;
                var paraRegex = _.isUndefined(m[2]) ? '(.+)' : '(' + m[2] + ')';
                var partialStr = s[1] + regex.escape(urlInRule.substring(s[0], m.index)) + paraRegex;
                s[2].push(m[1]);
                return [nextIndex, partialStr, s[2]];
            }, [0, '', []]);

        if (ret[0] < urlInRule.length) {
            ret[1] += urlInRule.substring(ret[0], urlInRule.length);
        }

        return [ret[1], ret[2]];
    };

    module.exports.parse = parse;
}());
