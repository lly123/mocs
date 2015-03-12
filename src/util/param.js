(function () {
    'use strict';

    var _ = require('underscore');

    var find = function (params, v) {
        var i = _.findLastIndex(params, function (p) {
            return _.isEqual(p[0], v);
        });
        return i > -1 ? params[i][1] : "";
    }

    module.exports.find = find;
}());