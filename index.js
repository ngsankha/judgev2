// make config a magic global variable
config = require('./config.js');

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case '--slave':
      var slave = require('./slave.js');
      slave.createServer();
      break;
    case '--master':
      var master = require('./master.js');
      master.createServers();
      break;
  }
} else {
  console.log("You must mention --master or --slave option.");
}