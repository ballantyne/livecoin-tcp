const path        = require('path');
const klass       = require('klass');
const _           = require('underscore');
var Interface     = require(path.join(__dirname, 'interface'));

module.exports = Interface.extend(function(options) {
  var self = this;
  this.channel = 'public';
  this.connect();

}).methods({

  orderbook: function(data, then) {
    this.get('/exchange/order_book', data, then) 
  },

  all_orderbook: function(data, then) {
    this.get('/exchange/all/order_book', data, then) 
  },

  maxbid_minask: function(data, then) {
    this.get('/exchange/maxbid_minask', data, then) 
  },

  restrictions: function(data, then) {
    this.get('/exchange/restrictions', data, then) 
  },

  coinInfo: function(data, then) {
    this.get('/info/coinInfo', data, then) 
  },

  last_trades: function(data, then) {
    this.get('/exchange/last_trades', data, then) 
  },

  ticker: function(data, then) {
    this.get('/exchange/ticker', data, then) 
  }
})
