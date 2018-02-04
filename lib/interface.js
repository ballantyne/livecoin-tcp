const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
const uuid        = require('uuid/v4');
const Client      = require(path.join(__dirname, 'client'));

const EventEmitter = require('events');

module.exports = klass(function(options) {
  var self = this;
  this.requestType = 'request';
  this.requester = new Client();
  this.events    = new EventEmitter();
  this.requests      = {};

}).methods({

  send: function(e, d) {
    //console.log('send',e, d);
    this.events.emit(e, d);
  },

  on: function(e, f) {
    this.events.on(e, f);
  },

  connect: function(channel) {
    var self = this;
    this.requester.on(this.channel + ':subscribe', function(json) {
      if (self.requests[json.id]) {
        self.requests[json.id](json.error, json.body);
        setTimeout(function(d) {
          delete self.requests[d.id];
        }, 100, json);
      }
    })
  },

  post: function(path, data, then) {
    var req = {data: data};
    req.method = 'post';
    this.exec(path, req, then);
  }, 

  get: function(path, data, then) {
    var req = {data: data};
    req.method = 'get';
    this.exec(path, req, then);
  }, 
  
  exec: function(path, data, then) {
    data = this.ensureId(data);
    data.url = path;
    data.type = this.requestType;
    this.requests[data.id] = then;
    data.channel = this.channel;
    this.requester.sendObject(data); 
  },
  
  ensureId: function(data) {
    if (data.id == undefined) {
      var id = uuid();
      data.id = id;
    }
    return data;
  }
});
 
