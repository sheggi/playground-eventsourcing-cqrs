/**
 * Accounting Service
 * ==================
 *
 * This service consumes the EventStore (or Stream) by periodically
 * pulling new events and evaluates each event.
 *
 * You can run multiple instances of this services if you like.
 * They will be eventually consistent.
 */
let express = require('express');
let app = express();
let http = require('../http');
let config = require('../config');


// helpers

const cache = {
  balance: 0,
  seq: 0,
};

function fetchEventStore(take, skip, cb) {
  http.get(config.stream_api + '/stream/', { take, skip }, (body, err) => {
    if (err) console.error('accounting.service request to stream service', err)
    let data = undefined;
    try {
      data = JSON.parse(body);
    } catch (err) {
      console.error('accounting.service failed fetching from event store', err)
    }
    if (data) {
      cb(data);
    }
  });
}


// endpoints

app.get('/accounting/', function (req, res) {
  res.send('Balance: ' + cache.balance + ' | Sequence: ' + cache.seq);
});


// serve

app.listen(3030, function () {
  console.log('accounting.service listening on port 3030!');
});

function evalEvent(event) {
  cache.balance += event.amount;
}

function loop() {
  fetchEventStore(config.accounting.take, cache.seq, (events) => {

    if (events.length) {
      console.log('accounting.service retreived ' + events.length + ' events');
    }

    events.forEach((event) => {
      try {
        evalEvent(event);
        console.log('accounting.service evaluated event seq: ' + cache.seq);
        cache.seq++;
      } catch (err) {
        console.error('accounting.service failed evaluating event', err);
      }
    })
  })

}

setInterval(loop, 500);