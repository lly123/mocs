(function () {
    'use strict';

    var _ = require('underscore');
    var regex = require('./regex');

    var compile = function (fn) {
        return function (urlInRule) {
            var ret = _.reduce(regex.repeat(/\{([0-9|a-z|A_Z]+)(?:\:(.+))?\}/g)(urlInRule),
                function (s, m) {
                    var nextIndex = m.index + m[0].length;
                    var paraRegex = _.isUndefined(m[2]) ? '(.+)' : '(' + m[2] + ')';
                    var partialStr = s[1] + regex.escape(urlInRule.substring(s[0], m.index)) + paraRegex;
                    s[2].push(m[1]);
                    return [nextIndex, partialStr, s[2]];
                }, [0, '', []]);

            if (ret[0] < urlInRule.length) {
                ret[1] += regex.escape(urlInRule.substring(ret[0], urlInRule.length));
            }

            return _.isEqual(urlInRule, '_') ?
                fn({regex: null, paramNames: []}) :
                fn({regex: ret[1], paramNames: ret[2]});
        };
    };


    var parse = function (c) {
        return function (url) {
            if (c.regex === null) {
                c.regex = regex.escape(url);
            }

            return new RegExp(c.regex).exec(url) === null ?
            {isMatched: false} :
            {isMatched: true, urlParams: _.zip(c.paramNames, new RegExp(c.regex).exec(url).slice(1))};
        };
    };

    module.exports.parse = compile(parse);
}());
