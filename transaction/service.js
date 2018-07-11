var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('../http');
var config = require('../config');

app.use(bodyParser.json({ type: 'application/json' }))

app.post('/transaction/', function (req, res) {
  console.log(req.body);
  http.post(config.stream_api+'/stream/', req.body, (body) => {
    console.log(body)
    res.send(body);
  })
});

app.listen(3000, function () {
  console.log('Transaction service listening on port 3000!');
});