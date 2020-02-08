'use strict';

const joi = require('joi');
const logger = require('winston');
const gitHub = require('../../../models/gitHubOperations');

const params = joi.object({
    id: joi.string().description('id'),
}).required();//validator

const handler = (req, reply) => {
    gitHub.read(req.params.id, (err, res) => {
        return err ? reply({ message: "Internal server error" }).code(500)
            : reply({ message: "Got the details", data: res || [] }).code(200);
    });
};

module.exports = {
    params,
    handler
};