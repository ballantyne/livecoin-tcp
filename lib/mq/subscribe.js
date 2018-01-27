const path       = require('path');
const klass      = require('klass');
const zmq        = require('zeromq');
const  _         = require('underscore');
const isJSON     = require('is-json');
const Serializer = require(path.join(__dirname, 'serializer'));
const EventEmitter = require('events');
var serializer   = new Serializer();

module.exports = klass(function(options) {
  var self = this;
  _.extend(this, options);

  if (self.port == undefined) {
    self.port = 6000;
  }

  if (self.address == undefined) {
    self.address = '0.0.0.0';
  }
  this.events = new EventEmitter();
  this.socket = zmq.socket('sub');
  this.socket.connect('tcp://' + self.address + ':' + self.port.toString());
  this.socket.on('message', function(channel, data) { 
    self.events.emit(channel.toString(), JSON.parse(serializer.deserializeBuffer(data.toString()).toString()));
  });

}).methods({
  subscribe: function(channel) {
    this.socket.subscribe(channel)
  },

  on: function(e, func) {
    var self = this;
    this.subscribe(e);
    this.events.on(e, func);  
  },

  stop: function() {
    this.socket.unmonitor();
  }
})


