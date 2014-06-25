lib = require('./tests/lib.js');

var sh = require('child_process'),
    net = require('net');

var master, slave, testServer, currTest;

var tested = 0,
    failed = 0;

function init() {
  master = sh.spawn('node', ['index.js', '--test', '--master']);
  console.log('Started master ...');
  slave = sh.spawn('node', ['index.js', '--test', '--slave', 'test-slave']);
  console.log('Started slave ...');
  testServer = net.createServer(testHandler);
  testServer.listen(2359);
}

function testHandler(socket) {
  var data = '';
  socket.on('data', function(buf) {
    data += buf;
  });
  socket.on('end', function() {
    tested++;
    if (!currTest.checkResponse(data))
      failed++;
    if (tested === tests.length)
      shutdown();
    else
      runTests(tested);
  });
};

function runTests(i) {
  currTest = require('./tests/' + tests[i]);
  currTest.runTest();
}

function shutdown() {
  slave.kill();
  master.kill();
  process.exit(failed);
}

init();

// wait for 1 second to ensure that master and slave servers are running
setTimeout(function() {
  runTests(0);
}, 1000);

var tests = [
  "testC.js",
  "testCompileError.js",
  "testRuntimeError.js",
  "testAcceptInput.js",
  "testJava.js",
  "testCPP.js",
  "testPython.js",
  "testWrongOutput.js",
  "testMatchLines.js",
  "testPartial.js",
  "testTLE.js"
];
