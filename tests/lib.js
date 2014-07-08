(function() {
  var net = require('net'),
      fs = require('fs');

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

  var createDbResponse = function(testfile, filename, language, input, output,
                                  matchLines, partial, time) {
    return { id: testfile,
             filename: filename,
             code: "" + fs.readFileSync('./tests/src/' + filename),
             language: language,
             input: input,
             output: output,
             matchLines: matchLines,
             partial: partial,
             time: time
           };
  };

  module.exports.sendToMaster = sendToMaster;
  module.exports.success = success;
  module.exports.fail = fail;
  module.exports.createDbResponse = createDbResponse;
})();
