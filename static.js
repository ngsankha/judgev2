(function() {
  var promise = require('promise'),
      fs = require('fs'),
      sh = require('child_process');

  var reportError = function(err) {
    console.log(err);
    throw err;
  };

  module.exports.reportError = reportError;

  // Promise representation of some Node.js function
  module.exports.mkdir = promise.denodeify(fs.mkdir);
  module.exports.writeFile = promise.denodeify(fs.writeFile);
  module.exports.readFile = promise.denodeify(fs.readFile);
  module.exports.exec = promise.denodeify(sh.exec);
})();