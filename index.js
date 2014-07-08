if (process.argv.length > 2) {
  var i = 2;
  if (process.argv[2] === '--test') {
    test = true;
    lib = require('./tests/lib.js');
    i = 3;
  } else
    test = false;

  // make config and static a magic global variable
  config = require('./config.js'),
  static = require('./static.js');

  switch (process.argv[i]) {
    case '--slave':
      var slave = require('./slave.js');
      slave.createServer(process.argv[i + 1]);
      break;
    case '--master':
      var master = require('./master.js');
      master.createServers();
      break;
  }
} else {
  console.log("You must mention --master or --slave [name] option.");
}