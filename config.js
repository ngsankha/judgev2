// Global configuration loader
(function() {
  var fs = require('fs');

  var config = JSON.parse(fs.readFileSync('config.json'));

  module.exports.slavePort = config.slavePort;
  module.exports.extPort = config.extPort;
  module.exports.dbHandler = config.dbHandler;
  module.exports.languages = config.languages;

  console.log('Configuration file loaded.');
})();
