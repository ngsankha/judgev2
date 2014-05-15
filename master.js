(function() {
  var fs = require('fs'),
      net = require('net');

  var slaves = [];

  var enlistServers = function() {
    var servers = JSON.parse(fs.readFileSync('slaves.json'));
    for (var name in servers) {
      slaves.push({ name: name,
                    ip: servers[name],
                    load: 0 });
    }
    console.log('List of slaves loaded.');
  };

  var createServers = function() {
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

  };

  var masterHandler = function(socket) {

  };
})();