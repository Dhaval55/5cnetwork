
    const logger = require('winston');
    const http = require('http');
    const Hapi = require('hapi');
    const Server = new Hapi.Server();
    const db = require('./models/mongodb');

    Server.connection({
        port: 8000, routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    Server.route(require('./web/router'));
    Server.on('response', (req) => {
        let reqTime = req.info.responded - req.info.received;
        logger.info(
            " Req Path : " + req.route.path +
            " Req Method : " + req.route.method.toUpperCase() +
            " StatusCode : " + req.response.statusCode +
            " Execution Time : " + reqTime + 'ms')
    });

    Server.start(() => {
        logger.info(`Server is listening on port `, 8000)
        db.connect(() => { });//create a connection to mongodb 
    });




