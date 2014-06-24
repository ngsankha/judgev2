(function() {
  var net = require('net');

  var passed = 0,
      failed = 0;

  var sendToMaster = function(data) {
    var client = net.connect({ host: 'localhost', port: 6029 },
      function() {
        client.end(data);
      });
    client.on('error', function(err) {
      // TODO: Need a good failure recovery mechanism here
      console.log(err);
    });
  };

  var success = function(data) {
    passed++;
    console.log("TEST PASSED: " + data);
  };

  var fail = function(data) {
    failed++;
    console.log("TEST FAILED: " + data);
  };

  module.exports.sendToMaster = sendToMaster;
  module.exports.success = success;
  module.exports.fail = fail;
})();
