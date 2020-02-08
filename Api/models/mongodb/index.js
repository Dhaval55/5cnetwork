    'use strict'


const logger = require('winston');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let state = { db: null };

/**
 * Method to connect to the mongodb
 * @param {*} url
 * @returns connection object
 */
exports.connect = (callback) => {

    if (state.db) return callback(); 
    mongodb.connect("mongodb://localhost:27017/test", (err, connection) => {
        if (err) {
            logger.error(`MongoDB error connecting to url`, err.message);

            process.exit(0);
            return callback(err);
        }

        state.db = connection;//assign the connection object

        logger.info(`MongoDB connection successfully established to url`);

        return callback();
    })
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => { return state.db }

/**
 * Method to close the mongodb connection
 */
exports.close = (callback) => {

    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            return callback(err);
        })
    }
}