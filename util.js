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

module.exports.isTrue = isTrue;
