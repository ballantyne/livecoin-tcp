const path       = require('path');
const klass      = require('klass');
const zmq        = require('zeromq');
const _          = require('underscore');
const Serializer = require(path.join(__dirname, 'serializer'));
const serializer = new Serializer();

module.exports   = klass(function(options) {
  var self = this;
  _.extend(this, options);

  if (self.port == undefined) {
    self.port = 6000;
  }

  if (self.address == undefined) {
    self.address = '0.0.0.0';
  }

  this.socket = zmq.socket('pub');
  this.socket.bindSync('tcp://' + self.address + ':' + self.port.toString());
}).methods({

  send: function(channel, data) {
    console.log(channel, data);
    this.socket.send([channel, serializer.serializeBuffer(data)]);
  },
  
  sendObject: function(channel, data) {
    if (channel.indexOf('market') == -1) {
      console.log('publish', channel, data);
    }
    this.sendRaw(channel, serializer.serializeObject(data))
  },

  sendRaw: function(channel, data) {
    this.socket.send([channel, data]);
  }
  
})



