const klass = require('klass');
const _ = require('underscore');

module.exports = klass(function(symbol) {
  this.ticks = []
}).methods({
  
  add: function (ticker) {
    if (this.ticks.length > 1000) {
      this.ticks.shift();
    }
    if (this.ticks.length == 0 || (this.ticks.length > 0 && ticker.volume != this.last().volume)) { 
      console.log(this.ticks.length)
      if (this.last.last > ticker.last) {
        console.log('                           changed down', ticker.symbol, ticker.last)
      } else {
        console.log('                           changed up', ticker.symbol, ticker.last)
      }
      this.ticks.push(ticker);
    }
  },
  
  last: function() {
    return _.last(this.ticks)
  },

  since: function(time) {
    return _.filter(this.ticks, function(t) { return t.time > time})
  }
})
