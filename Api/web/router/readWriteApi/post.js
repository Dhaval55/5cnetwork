'use strict';
var http = require("https");
var request = require('request');
const joi = require('joi');
const gitHub = require('../../../models/gitHubOperations');
const url = require('url'); 

const payload = joi.object({
    url: joi.string().required().description('url')
}).required();//validator

const handler = (req, reply) => {
    let urlObject = url.parse(req.payload.url, true);
    let host = urlObject.host;
    let pathname = urlObject.pathname;
    const requestToGithub = () => {
        return new Promise((resolve, reject) => {
            getRequest(function (err, response) {
                if (!err) {
                    resolve(response);
                } else {
                    let errRes = { message: "internal server error", code: 500 }
                    reject(errRes);
                }
            })
        });
    }

    var getRequest = function (callback) {

        var options = {
            "method": "GET",
            "hostname": host,
            "path": pathname,
            "headers": {
                "cache-control": "no-cache",
                'user-agent': 'node.js'
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var string = body.toString();
                callback(null,JSON.parse(string));
            });
        });
        req.end();
    }

    const storeDataInMongoDb = (data) => {
        return new Promise((resolve, reject) => {
            gitHub.insert(data, (err, result) => {
                return err ? reject({ message: "Error While Inserting Data", code: 500 })
                    : resolve(data);
            });
        });
    }

    requestToGithub()
        .then(storeDataInMongoDb)
        .then(data => {
            return reply({ message: "Successfully" }).code(200);
        }).catch(e => {
            return reply({ message: e.message }).code(e.code);
        });
};


module.exports = {
    payload,
    handler
};