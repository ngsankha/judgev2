(function() {
  var net = require('net');
  var counter = 0;

  var createServer = function() {
    // create the slave compilation server
    var slaveServer = net.createServer(slaveHandler);
    slaveServer.listen(config.slavePort, 'localhost');
    console.log('Slave server is up.');
  };

  var slaveHandler = function(socket) {
    var data = '';
    socket.on('data', function(buf) {
      data += buf;
    });
    socket.on('end', function() {
      // handling the judging part
    });
  };

  module.exports.createServer = createServer;
})();