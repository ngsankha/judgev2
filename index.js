// make config and static a magic global variable
config = require('./config.js'),
static = require('./static.js');

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case '--slave':
      var slave = require('./slave.js');
      slave.createServer(process.argv[3]);
      break;
    case '--master':
      var master = require('./master.js');
      master.createServers();
      break;
  }
} else {
  console.log("You must mention --master or --slave [name] option.");
}