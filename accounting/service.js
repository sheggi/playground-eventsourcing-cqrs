var express = require('express');
var app = express();
var http = require('../http');
var config = require('../config');

const cache = {
  balance: 0,
  seq: 0,
};

app.get('/accounting/', function (req, res) {
  res.send('Balance: ' + cache.balance + ' | Sequence: ' + cache.seq);
});

app.listen(3030, function () {
  console.log('Accounting Service listening on port 3030!');
});

// check loop
function loop() {
  // skip sequence take 10
  cache.seq++;
  cache.balance += 50;
}

setInterval(loop, 500);