const path         = require('path');
const klass        = require('klass');
const _            = require('underscore');
const Requester    = require(path.join(__dirname, 'mq/requester'));
const EventEmitter = require('events');
var uuid           = require('uuid/v4');
var requests       = {};

module.exports = klass(function(options) {
  var self = this;
  _.extend(this, options);

  this.requester     = new Requester(options);
  this.events        = new EventEmitter();

  this.requester.on('message', function(data) {
    var json = JSON.parse(data.toString());
    self.send(json.channel+':subscribe', json);
    setTimeout(function() { 
      delete requests[json.id];
    }, 100);
  })

  this.on('public', function(data) {
    data.channel = 'public:subscribe';
    self.send('request', data);
  });

  this.on('voucher', function(data) {
    data.channel = 'voucher:subscribe';
    self.send('request', data);
  });

  this.on('user', function(data) {
    data.channel = 'user:subscribe';
    self.send('request', data);
  });

  this.on('withdrawal', function(data) {
    data.channel = 'withdrawal:subscribe';
    self.send('request', data);
  });

  this.on('order', function(data) {
    data.channel = 'order:subscribe';
    self.send('request', data);
  
  })

  this.on('request', function(data) {
    requester.sendObject(data);
    console.log('request', data) 
  })

}).methods({
  sendObject: function(data) {
    this.requester.sendObject(data);    
  },
  
  send: function(e, d) {
    this.events.emit(e, d);
  },

  on: function(e, f) {
    this.events.on(e, f);
  }
})
