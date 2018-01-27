var _ = require('underscore');
var config = require('./config');
const crypto = require('crypto');
const querystring = require('querystring');

var data = {
  'currencyPair': 'BTC/USD',
  'price':'100',
  'quantity': '0.01'
}
var keys = _.keys(data).sort();
var obj = {};

for (i = 0; i < keys.length; i++) { 
  var key = keys[i];
  obj[key] = data[key];
}
var string = querystring.stringify(obj);

var sign = function(string) {
  const hmac = crypto.createHmac('sha256', config.secret);

  hmac.update(string);
  return hmac.digest('hex').toUpperCase();
}

console.log(sign(string));
