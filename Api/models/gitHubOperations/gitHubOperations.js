'use strict'

const db = require('../mongodb')
const logger = require('winston');
const collectionName = 'gitHubData';

const insert = (data, callback) => {
    try {
        db.get().collection(collectionName)
            .insertMany(data, ((err, result) => {
                return callback(err, result);
            }));
    } catch (e) {
        return callback(e);
    }
}

const read = (data, callback) => {
    db.get().collection(collectionName)
        .findOne(data, ((err, result) => {
            return callback(err, result);
        }));
}
module.exports = {
    read,
    insert,

};

