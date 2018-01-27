const klass    = require('klass');
const _        = require('underscore');
const isJSON   = require('is-json');

module.exports = klass(function(options) {
  
  _.extend(this, options);

}).methods({

  isBuffer: function(data) {
    return (data instanceof Buffer);
  },

  isEncoded: function(string) {
    var self   = this;
    return (string == self.serializeBuffer(self.deserializeBuffer(string)))
  },
  
  decodeObject: function(obj) {
    var self = this;
    return _.mapObject(obj, function(val, key) { return (self.isEncoded(val) ? self.decodeBuffer(val) : val)})
  },
  
  serializeBuffer: function(buffer) {
    return new Buffer(buffer).toString('base64');
  },

  serializeObject: function(obj) {
    var self = this;
    return self.serializeBuffer(JSON.stringify(_.mapObject(obj, function(val, key) { return (self.isBuffer(val) ? self.serializeBuffer(val) : val) })));
  },

  deserializeObject: function(obj) {
    var self = this;
    return  _.mapObject(obj, function(val, key) { return (self.isEncoded(val) ? self.deserializeBuffer(val) : val )})
  },

  serialize: function(data) {
    var self   = this;
    var type   = typeof data;
    if (type == 'object' && self.isBuffer(data)) {
      return this.serializeBuffer(data);
    } else {
      if (type == 'object') {
        return self.serializeObject(data);  
      }
      if (type == 'string') {
        return data;
      }
    }
  },
  
  deserializeBuffer: function(serializedBuffer) {
    var type = typeof serializedBuffer;
    if (type == 'number') {
      return serializedBuffer
    } else {
      return Buffer.from(serializedBuffer, 'base64');
    }
  },

  deserialize: function(data, options) {
    data       = JSON.parse(this.deserializeBuffer(data.toString()));
    var type   = typeof data;
    if (data.type == 'buffer') {
      if (options.decode == true) {
        var d = this.decodeBuffer(data.data);
        var t = typeof d;
        
        if (t == 'object') {
          return this.decodeObject(d);
        } else {
          return d;
        } 
      } else {
	return data.data;
      }
    }
    if (data.type == 'string') {
      return data.data;
    }
    if (data.type == 'object') {
      return this.decodeObject(data.data);
    }
  },

  decodeBuffer: function(data) {
    return this.decodeIfJSON(data.toString());
  },

  decodeIfJSON: function(data) {
    if (isJSON(data)) {
      var json = JSON.parse(data);
      json =  this.deserializeObject(json)
      return json;
    } else {
      return data;
    }
  }
  
})
