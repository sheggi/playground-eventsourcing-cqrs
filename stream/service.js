var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('../http');
var config = require('../config');

app.use(bodyParser.json({ type: 'application/json' }))

const stream = [];

app.post('/stream/', function (req, res) {
  console.log(req.body);
  stream.push(req.body);
  res.send({seq: stream.length});
});

app.get('/stream/', function (req, res) {
  const take = Math.max(parseInt(req.take) || 1, 1);
  const skip = Math.max(parseInt(req.skip) || 10, 0);
  const edge = skip + take;

  const fragment = [];
  for(let i = skip; i < edge; i++) {
    if (i > stream.size) {
      i += take;
      continue;
    }

    fragment.push(stream[i]);
  }

  res.send(fragment);
});


app.listen(3060, function () {
  console.log('Stream service listening on port 3060!');
});