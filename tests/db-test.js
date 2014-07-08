(function() {
  var net = require('net');

  var pingHarness = function(data) {
    var client = net.connect({ host: 'localhost', port: 2359 },
      function() {
        client.end(data);
      });
    client.on('error', function(err) {
      console.log(err);
    });
  };

  var parse = function(data) {
    var currTest = require('./' + data);
    return currTest.dbResponse();
  };

  var reportCompileFail = function(id, msg) {
    pingHarness("CompileError");
  };

  var reportRunFail = function(id, msg) {
    pingHarness("RuntimeError");
  };

  var reportTLE = function(id) {
    pingHarness("TLE");
  };

  var reportResult = function(id, msg) {
    pingHarness(msg);
  };

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
  module.exports.reportResult = reportResult;
  module.exports.reportTLE = reportTLE;
})();