/**
 * Stream Service
 * ==============
 *
 * This replaces the event store.
 * Could also just be a database.
 */

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let http = require('../http');
let config = require('../config');
let fs = require('fs');


// helper

app.use(bodyParser.json({ type: 'application/json' }))

function loadStore() {
  return JSON.parse(fs.readFileSync('store.json')) || [];
}

function persistStore(data, cb) {
  fs.writeFile('store.json', JSON.stringify(stream), 'utf8', (err) => cb(err));
}


// endpoints

app.post('/stream/', function (req, res) {
  stream.push(req.body);

  persistStore(stream, (err) => {
    if (err) console.error('stream.service failed to persist store.json', err);
    else console.log('stream.service event store persisted');
  });

  res.send({ seq: stream.length });
});

app.get('/stream/', function (req, res) {
  const take = Math.max(parseInt(req.query.take) || 1, 1);
  const skip = Math.max(parseInt(req.query.skip) || 0, 0);
  const edge = skip + take;

  // take a window of event store
  const fragment = [];
  for (let i = skip; i < edge; i++) {
    if (i >= stream.length) {
      break;
    }

    fragment.push(stream[i]);
  }

  res.send(fragment);
});


// serve

let stream = [];
try {
    stream = loadStore();
} catch (err) {
    console.error('stream.service failed to read store.json => use empty store', err);
}

app.listen(3060, function () {
  console.log('stream.service listening on port 3060!');
});