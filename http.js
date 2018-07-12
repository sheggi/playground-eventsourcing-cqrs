/**
 * abstracting the request lib for simple use
 */

let request = require('request');

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
    get: function(url, query, cb){
        request({
            uri: url,
            qs: query,
            method: 'GET',
          }, (error, response, body) => {
            cb(body, error);
        });
    },
}