(function () {
    'use strict';

    var _ = require('underscore');

    var diff = function (objName, o1, o2, fn) {
        var typeOf = function (obj) {
            return {}.toString.call(obj);
        };

        var diffKeys = function (keys1, keys2) {
            var sameKeys = _.intersection(keys1, keys2);
            var deletedKeys = _.difference(keys1, keys2);
            var addedKeys = _.difference(keys2, keys1);

            if (!_.isEmpty(deletedKeys) || !_.isEmpty(addedKeys)) {
                fn(
                    {
                        objName: objName,
                        keys: {
                            deletedKeys: deletedKeys,
                            addedKeys: addedKeys
                        }
                    }
                );
            }

            return sameKeys;
        };

        var diffValueTypes = function (o1, o2, keys) {
            var o1Values = _.values(_.pick(o1, keys));
            var o2Values = _.values(_.pick(o2, keys));

            var typeChangedKeys = _.reduce(_.zip(o1Values, o2Values, _.range(0, o1Values.length)), function (s, v) {
                if (typeOf(v[0]) !== typeOf(v[1])) {
                    s.push(keys[v[2]]);
                }
                return s
            }, []);

            if (!_.isEmpty(typeChangedKeys)) {
                fn(
                    {
                        objName: objName,
                        keys: {
                            typeChangedKeys: typeChangedKeys
                        }
                    }
                );
            }

            return typeChangedKeys;
        };

        var sameKeys = diffKeys(_.keys(o1), _.keys(o2));
        if (!_.isEmpty(sameKeys)) {
            var typeChangedKeys = diffValueTypes(o1, o2, sameKeys);
            var deepKeys = _.difference(sameKeys, typeChangedKeys);

            _.each(deepKeys, function (key) {
                if (typeOf(o1[key]) === '[object Object]') {
                    diff(key, o1[key], o2[key], fn);
                }
            });
        }
    };

    module.exports.diff = diff;
}());
