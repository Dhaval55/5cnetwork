'use strict';

const get = require('./get');
const post = require('./post');

module.exports = [
    {
        method: 'GET',
        path: '/github/{id}',
        handler: get.handler,
        config: {
            auth: false,
            validate: {
                params: get.params
            }
        }
    },
    {
        method: 'POST',
        path: '/github',
        handler: post.handler,
        config: {
            auth: false,
             validate: {
                payload: post.payload
            }
        }
    }
];