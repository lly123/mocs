var _ = require('underscore');
var http = require('http');
var config = require('./config.js');
var util = require('./util.js');
var responseJson = require('./response/json.js');

var globalConfig;

var server = http.createServer(function (request, response) {
    _.compose(function (r) {
        util.isTrue(globalConfig.env())(
            [!r, function () {
                response.statusCode = 404;
                response.end();
            }],
            [r && r.response.json, function (e) {
                responseJson.run(response, e, r.response.json);
            }]
        );
    }, _.first, globalConfig.rules)(request);
});

server.listen(3000, function () {
    console.log("Server listening on port 3000.");
    globalConfig = config.load();
});
