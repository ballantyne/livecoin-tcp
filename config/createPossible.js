// require('./lib/env');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var pairs = require('./currency_pairs');
var Public = require(path.join('..', 'lib', 'public'));
var p = new Public();

p.restrictions({}, function(err, data) {

  var json = _.map(_.uniq(_.flatten(_.map(pairs, function(a) { 
    return a.currencyPair.split('/') 
  }))), function(i) {

    var r = {
      symbol: i, 
      possible: _.filter(_.map(pairs, function(q) {
        var m = _.findWhere(data.restrictions, {currencyPair: q.currencyPair});
        if (m != undefined) m = m.minLimitQuantity
          var c = {
            currencyPair: q.currencyPair, 
            precision: { price: q.price, size: q.size },
            otherCurrency: q.currencyPair.replace(i, '').replace('/', '')
          }
        if (m) {
          c.minLimitQuantity = m;
        }
        return c;
      }), function(w) { 
        return (w.currencyPair.indexOf(i) > -1 && w.otherCurrency != 'USD' && w.otherCurrency != 'EUR' && w.otherCurrency != 'RUR')
      })
    }; 
    return r
  });

  console.log(JSON.stringify(json))
  process.exit(0)
});
