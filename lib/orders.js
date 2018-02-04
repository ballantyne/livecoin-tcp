const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
var Interface     = require(path.join(__dirname, 'interface'));

module.exports = Interface.extend(function(options) {
  var self = this;
  this.channel = 'orders';
  this.requestType = 'order'
  this.connect();
}).methods({

  buylimit: function(data, then) {
    this.post('/exchange/buylimit', data, then); 
  },

  selllimit: function(data, then) {
    this.post('/exchange/sellimit', data, then); 
  },

  buymarket: function(data, then) {
    this.post('/exchange/buymarket', data, then); 
  },

  sellmarket: function(data, then) {
    this.post('/exchange/sellmarket', data, then); 
  },

  cancellimit: function(data, then) {
    this.post('/exchange/cancellimit', data, then); 
  }
})
