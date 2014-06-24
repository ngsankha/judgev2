var sh = require('child_process');

var master, slave;

function init() {
  console.log('Started master ...');
  master = sh.spawn('node', ['index.js', '--test', '--master']);
  console.log('Started slave ...');
  slave = sh.spawn('node', ['index.js', '--test', '--slave', 'test-slave']);
}

init();
