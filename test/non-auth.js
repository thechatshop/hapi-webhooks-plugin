'use strict';

const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const lab = exports.lab = Lab.script();

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

lab.experiment('Integration test', () => {

    lab.before(() => {

        return server.register([{
            register: require('../src/index'),
            options: { eventName: 'mailstatus' }
        }]);
    });

    lab.after(() => {

        return server.stop();
    });

    lab.test('Works', (done) => {

        const requestParams = {
            url: '/webhooks/mailstatus',
            method: 'POST'
        };

        server.once('webhooks-mailstatus', (request) => {

            expect(request).not.to.equal(null);
            done();
        });

        server.inject(requestParams, (res) => {

            expect(res.statusCode).to.equal(204);
        });
    });
});
