(function() {
  var fs = require('fs'),
      net = require('net');

  var slavesIp = {},
      slavesLoad = {};

  var enlistServers = function() {
    slavesIp = JSON.parse(fs.readFileSync(test ? './tests/slaves.json' : 'slaves.json'));
    for (var i = 0; i < slavesIp.length; i++) {
      slavesLoad[i] = 0;
    }
    console.log('List of slaves loaded.');
  };

  var createServers = function() {
    enlistServers();

    // create the server that will handle internal slaves load balancing
    var masterServer = net.createServer(masterHandler);
    masterServer.listen(config.masterPort, 'localhost');
    console.log('Master server is up.');

    // create the server that will handle all external judge requests
    var extServer = net.createServer(extHandler);
    extServer.listen(config.extPort, 'localhost');
    console.log('External server is up.');
  };

  var extHandler = function(socket) {
    var data = '';
    socket.on('data', function(buf) {
      data += buf;
    });
    socket.on('end', function() {
      sendToSlave(data);
    });
  };

  var masterHandler = function(socket) {
    var data = '';
    socket.on('data', function(buf) {
      data += buf;
    });
    socket.on('end', function() {
      slavesLoad[data]--;
    });
  };

  var sendToSlave = function(data) {
    var minLoad = Infinity,
        name;
    for (var server in slavesIp) {
      if (slavesLoad[server] < minLoad) {
        minLoad = slavesLoad[server];
        name = server;
      }
    }
    var client = net.connect({ host: slavesIp[name], port: config.slavePort },
      function() {
        client.end(data);
        slavesLoad[name]++;
      });
    client.on('error', function(err) {
      // TODO: Need a good failure recovery mechanism here
      console.log("Error connecting to host:", name);
    });
  };

  module.exports.createServers = createServers;
})();
