(function () {
    'use strict';

    var _ = require('underscore');

    var find = function (params, v) {
        var i = _.findLastIndex(params, function (p) {
            return _.isEqual(p[0], v);
        });
        return i > -1 ? params[i][1] : "";
    }

    var replace = function (params, v) {
        return v.replace(/\{\{([0-9|a-z|A_Z]+)\}\}/g, function (s, v) {
            return find(params, v);
        });
    }

    module.exports.replace = replace;
}());