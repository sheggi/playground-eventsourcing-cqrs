/**
 * Transaction Service
 * ===================
 *
 * Receives the request for the transaction.
 *
 */

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let http = require('../http');
let config = require('../config');

app.use(bodyParser.json({ type: 'application/json' }))

// helper

function pushToEventstore(data, cb) {
  http.post(config.stream_api + '/stream/', data, (body) => cb(body));
}

// endpoints

app.post('/transaction/', function (req, res) {
  console.log('transaction.service post', req.body);
  pushToEventstore(req.body, (response) => {
    console.log('transaction.service event saved', response)
    res.send(response);
  })
});

// serve

app.listen(3000, function () {
  console.log('transaction.service listening on port 3000!');
});