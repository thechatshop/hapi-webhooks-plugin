'use strict';

const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const { authHeader } = require('../lib/utils');

const lab = exports.lab = Lab.script();

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

lab.experiment('Auth Integration test', () => {

    lab.before(() => {

        return server.register([
            require('hapi-auth-basic'),
            {
                register: require('hapi-tiny-auth'),
                options: {
                    username: 'USERNAME',
                    password: 'PASSWORD'
                }
            },
            {
                register: require('../src/index'),
                options: {
                    auth: 'tiny',
                    eventName: 'mailstatus'
                }
            }
        ]);
    });

    lab.after(() => {

        return server.stop();
    });

    lab.test('Returns 401 on non-authentication', (done) => {

        const requestParams = {
            url: '/webhooks/mailstatus',
            method: 'POST'
        };

        server.inject(requestParams, (res) => {

            expect(res.statusCode).to.equal(401);
            done();
        });
    });

    lab.test('Returns 204 on authentication', (done) => {

        const requestParams = {
            url: '/webhooks/mailstatus',
            method: 'POST',
            headers: {
                Authorization: authHeader('USERNAME', 'PASSWORD')
            }
        };

        server.inject(requestParams, (res) => {

            expect(res.statusCode).to.equal(204);
            done();
        });
    });
});
