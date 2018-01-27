const path   = require('path');
const klass  = require('klass');
const zmq    = require('zeromq');
const  _     = require('underscore');
const polo   = require('polo');
const EventEmitter = require('events');
const isJSON = require('is-json');
const Serializer = require(path.join(__dirname, 'serializer'));
var serializer   = new Serializer();

module.exports = klass(function(options) {
  var self = this;
  _.extend(this, options);
  self.events = new EventEmitter();

  if (self.port == undefined) {
    self.port = 12000;
  }

  if (self.address == undefined) {
    self.address = '127.0.0.1';
  }

  var services       = polo();
  services.put('livecoin-api', self.port);
  
  this.connect('stream');  

  this.socket.on('message', function(data) { 
    self.emit('message', serializer.deserializeBuffer(data.toString()));
  });


}).methods({
  send: function(data) {
    this.socket.send(this.serialize(data));
  },
  
  serialize: function(data) {
    return serializer.serializeObject(data);
  },
  
  connect: function(name, register) {
    var self = this;
    this.socket   = zmq.socket('rep');
    if (register) {
      this.services = this.discovery();
      this.services.put(name, self.port);
    }
    this.bind();
  },

  bind: function() {
    var self = this;
    this.socket.bind('tcp://'+this.address+':'+this.port, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Listening on", self.port);
        }
    });
    process.on('SIGINT', function() {
      self.socket.close();
    });
  },

  discovery: function() {
    var services = polo();
    
    services.on('up', function(name, service) {
      console.log('[up]', name, service.host+':'+service.port);
    });
    services.on('down', function(name, service) {
      console.log('[down]', name, service.host+':'+service.port);
    });
    return services;
  },

  emit: function(e, d) {
    this.events.emit(e, d);
  },

  on: function(e, func) {
    this.events.on(e, func);
  },

  stop: function() {
    this.socket.unmonitor();
  }
})
