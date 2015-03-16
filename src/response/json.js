(function () {
    'use strict';

    var _ = require('underscore');
    var clone = require('clone');
    var param = require('../util/param');
    var util = require('../util/util');

    var header = function (env, res) {
        res.writeHead(200,
            {
                'Server': env.serverName,
                'Content-Type': 'application/json;charset=UTF-8',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            });
    };

    var run = function (res, env, rule) {
        header(env, res);

        var responseData = clone(rule.response.json);
        _.compose(
            util.c2(_.each, function (v) {
                console.log('>>> ' + responseData);
                responseData.push(v.data);
            }),

            util.c2(_.filter, function (v) {
                return v.id === rule.request.id;
            })
        )(env.responseData);

        res.end(param.replace(rule.request.params, JSON.stringify(responseData)));
    };

    module.exports.run = run;
}());
