// Global configuration loader
(function() {
  var fs = require('fs');

  var config = JSON.parse(fs.readFileSync('config.json'));

  module.exports.slavePort = config.slavePort;
  module.exports.extPort = config.extPort;

  console.log('Configuration file loaded.');
})();
