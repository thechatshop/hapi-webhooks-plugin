Webhooks plugin for Hapi
========================

[![Build Status](https://travis-ci.org/thechatshop/hapi-webhooks-plugin.svg?branch=master)](https://travis-ci.org/thechatshop/hapi-webhooks-plugin)

Simple webhooks functionality for Hapi.

Usage
-----
Register the plugin to your server

```javascript
server.register([{
    register: require('hapi-webhooks-plugin'),
    options: {
        auth: 'optional-auth-strategy',
        eventName: 'name'
    }
}]);
```
The above exposes a webhook at `/webhooks/name` that listens for `GET` and `POST` requests. It also exposes a server event called `webhooks-name`. Use the event to run the business logic part.

```javascript
server.event('webhooks-name', function(request) {
    // Handle things here
};
```
