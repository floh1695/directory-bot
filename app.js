'use strict';

const APP_ID = '159041564812667';
const PAGE_ACCESS_TOKEN = 'EAACQpbZC5pXsBAHsvd8mzcvRJh7KCJ7rmPxdQCQvWGfdPUG3ZA31BcaWvRkuz9ZAmsKmcsmoXSHYcJv24eNMWoUKZArjLMgEj0V1kJ15zuBHPTCqWp3JpNd6ZBG0s0fFYo23af66LZAL7trRNQwpHj9J5zcd5ZAeGP7RE827hDbFwZDZD';

// Import dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = PAGE_ACCESS_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

app.get('/hello', (req, res) => {
    // res.json({ hello: 'world' })
    res.send('<button>clickme</button>');
});

// Sets server port and logs message on success
app.listen(80, () => console.log('webhook is listening'));
