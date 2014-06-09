var net = require('net');
for (var i = 0; i < 10; i++) {
  ping();
}

function ping() {
  var client = net.connect({ host: 'localhost', port: 6029 },
  function() {
    client.end('hello');
  });
}