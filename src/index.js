'use strict';

module.exports = function (server, options, next) {

    const eventName = `webhooks-${options.eventName}`;
    server.event(eventName);

    const config = {};

    config.handler = function (request, reply) {

        reply().code(204);
        setImmediate(() => server.emit(eventName, request));
    };

    (typeof options.auth !== 'undefined') ? config.auth = options.auth : null;

    server.route({
        path: `/webhooks/${options.eventName}`,
        method: ['GET', 'POST'],
        config
    });

    next();
};

module.exports.attributes = {
    pkg: require('../package.json'),
    multiple: true
};
