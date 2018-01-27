const path = require('path');

module.exports.server        = require(path.join(__dirname, 'lib', 'server'));
module.exports.client        = require(path.join(__dirname, 'lib', 'client'));
module.exports.user          = require(path.join(__dirname, 'lib', 'user'));
module.exports.orders        = require(path.join(__dirname, 'lib', 'orders'));
module.exports.public        = require(path.join(__dirname, 'lib', 'public'));
module.exports.voucher       = require(path.join(__dirname, 'lib', 'voucher'));
module.exports.withdrawal    = require(path.join(__dirname, 'lib', 'withdrawal'));
