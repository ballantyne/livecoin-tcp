const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
var Interface     = require(path.join(__dirname, 'interface'));

module.exports = Interface.extend(function(options) {
  var self = this;
  this.channel = 'voucher';
  this.connect();
}).methods({
  make: function(data, then) {
    this.post('/payment/voucher/make', data, then) 
  },

  amount: function(data, then) {
    this.post('/payment/voucher/amount', data, then) 
  },

  redeem: function(data, then) {
    this.post('/payment/voucher/redeem', data, then) 
  }
})
