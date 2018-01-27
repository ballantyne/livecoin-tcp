const path  = require('path');
const klass = require('klass');
var Ticks   = require(path.join(__dirname, 'ticks'));

module.exports = klass(function() {

  this.tickers = {};

}).methods({
  
  ticks: function(s) {
    return this.tickers[s]
  },
  
  add: function (t) {
    if (this.tickers[t.symbol] == undefined) {
      this.tickers[t.symbol] = new Ticks();
    }
    this.tickers[t.symbol].add(t);
  },
  
  last: function(s) {
    return this.ticks(s).last()
  },

  since: function(s, time) {
    return this.ticks(s).since(time)
  }

})
