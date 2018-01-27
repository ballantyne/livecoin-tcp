const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
var Interface     = require(path.join(__dirname, 'interface'));

module.exports = Interface.extend(function(options) {
  var self = this;
  this.channel = 'voucher';
  this.connect();

}).methods({
  address: function(data, then) {
    this.get('/payment/get/address', data, then) 
  },

  payeer: function(data, then) {
    this.post('/payment/out/payeer', data, then) 
  },

  capitalist: function(data, then) {
    this.post('/payment/out/capitalist', data, then) 
  },

  advcah: function(data, then) {
    this.post('/payment/out/advcah', data, then) 
  },

  card: function(data, then) {
    this.post('/payment/out/card', data, then) 
  },

  okpay: function(data, then) {
    this.post('/payment/out/okpay', data, then) 
  },

  perfectmoney: function(data, then) {
    this.post('/payment/out/perfectmoney', data, then) 
  }
})
