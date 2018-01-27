const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
var Interface     = require(path.join(__dirname, 'interface'));

module.exports = Interface.extend(function(options) {
  var self = this;
  this.channel = 'user';
  this.connect();
}).methods({
  trades: function(data, then) {
    this.get('/exchange/trades', data, then);
  },

  client_orders: function(data, then) {
    this.get('/exchange/client_orders', data, then);
  },

  order: function(data, then) {
    this.get('/exchange/order', data, then); 
  },

  payment_balances: function(data, then) {
    this.get('/payment/balances', data, then); 
  },

  payment_balance: function(data, then) {
    this.get('/payment/balance', data, then) 
  },

  history: function(data, then) {
    this.get('/payment/history/transactions', data, then); 
  },

  history_size: function(data, then) {
    this.get('/payment/history/size', data, then); 
  },

  commission: function(data, then) {
    this.get('/exchange/commission', data, then); 
  },

  commissionCommonInfo: function(data, then) {
    this.get('/exchange/commissionCommonInfo', data, then); 
  }
})
