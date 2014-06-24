// Global configuration loader
(function() {
  var fs = require('fs');

  var config = JSON.parse(fs.readFileSync(test ? 'tests/config.json' : 'config.json'));

  module.exports.slavePort = config.slavePort;
  module.exports.extPort = config.extPort;
  module.exports.masterIP = config.masterIP;
  module.exports.masterPort = config.masterPort;
  module.exports.dbHandler = config.dbHandler;
  module.exports.languages = config.languages;

  console.log('Configuration file loaded.');
})();
