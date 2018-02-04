const path         = require('path');
const klass        = require('klass');
const _            = require('underscore');
const Responder    = require(path.join(__dirname, 'mq/responder'));
const livecoin     = require('livecoin')
const EventEmitter = require('events');
var rateLimit    = require('function-rate-limit');
var requests = {};

module.exports = klass(function(options) {
  if (options == undefined) options = {url: 'https://api.livecoin.net'};
  var self            = this;
  this.socket         = new Responder(options);
  if (options.key && options.secret) {
    var signer        = new livecoin.signature({key: options.key, secret: options.secret});
  } else {
    var signer        = false;
  }
  this.events         = new EventEmitter();

  var createRequest   = rateLimit(60, 60000, livecoin.request)


  this.socket.on('message', function(data) {
    var json = JSON.parse(data.toString());
    //console.log(json);
    if (json.type == 'request') {
      createRequest(options.url, json, signer, function(err, id, body) {
        json.error = err;
        json.body = body
        self.socket.send(json);
      })
    } 
    if (json.type == 'order') {
      createRequest(options.url, json, signer, function(err, id, body) {
        json.error = err;
        json.body = body
        self.socket.send(json);
      })
    }
  })

  this.on('order', function(data) {
    createOrder(data); 
  });

  this.on('request', function(data) {
    createRequest(options.url, data, signer, function(err, id, body) {
      self.socket.send(data.channel, {id: id, error: err, body: body});
    })
  });

}).methods({
  emit: function(e, d) {
    this.events.emit(e, d);
  },

  on: function(e, f) {
    this.events.on(e, f);
  }
})
