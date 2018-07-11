var request = require('request');

var options = {
  uri: 'https://www.googleapis.com/urlshortener/v1/url',
  method: 'POST',
  json: {
    "longUrl": "http://www.google.com/"
  }
};

request({
    uri: 'https://www.googleapis.com/urlshortener/v1/url',
    method: 'POST',
    json: {
      "longUrl": "http://www.google.com/"
    }
  }, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id) // Print the shortened url.
  }
});

module.exports = {
    post: function(url, data, cb){
        request({
            uri: url,
            method: 'POST',
            json: data
          }, (error, response, body) => {
              cb(body, error);
          });
    },
    get: function(url, data, cb){
        request({
            uri: url,
            method: 'GET',
          }, (error, response, body) => {
            cb(body, error);
        });
    },
}