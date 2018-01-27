
const path   = require('path');
const klass  = require('klass');
const zmq    = require('zeromq');
const  _     = require('underscore');
const isJSON = require('is-json');
const Serializer = require(path.join(__dirname, 'serializer'));
var serializer   = new Serializer();
const EventEmitter = require('events');
var  events = new EventEmitter();


module.exports = klass(function(options) {
  var self = this;
  _.extend(this, options);


  if (self.port == undefined) {
    self.port = 11000;
  }

  if (self.address == undefined) {
    self.address = '127.0.0.1';
  }
  
  this.socket = zmq.socket('req');
  this.socket.connect('tcp://' + self.address + ':' + self.port.toString());
  this.socket.on('message', function(data) { 
    self.emit('message', serializer.deserializeBuffer(data.toString()));
  });
}).methods({

  send: function(data) {
    this.socket.send(serializer.serializeBuffer(data));
  },
  
  sendObject: function(data) {
    this.sendRaw(serializer.serializeObject(data))
  },

  sendRaw: function(data) {
    this.socket.send(data);
  },
 
  emit: function(e, d) {
    events.emit(e, d);
  },

  on: function(e, f) {
    events.on(e, f); 
  },

  stop: function() {
    this.socket.unmonitor();
  }
})

