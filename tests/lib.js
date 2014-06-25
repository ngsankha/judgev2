(function() {
  var net = require('net');

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
    console.log("TEST PASSED: " + data);
    return true;
  };

  var fail = function(data) {
    console.error("TEST FAILED: " + data);
    return false;
  };

  module.exports.sendToMaster = sendToMaster;
  module.exports.success = success;
  module.exports.fail = fail;
})();
