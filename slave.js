(function() {
  var net = require('net'),
      fs = require('fs'),
      rimraf = require('rimraf'),
      db = require(config.dbHandler),
      reportError = static.reportError;
  var counter = 0,
      name;

  var createServer = function(serverName) {
    name = serverName;

    // remove old stage directory
    rimraf('stage', function(err) {
      if (!err) {
        fs.mkdirSync('stage');
        // create the slave compilation server
        var slaveServer = net.createServer(slaveHandler);
        slaveServer.listen(config.slavePort, 'localhost');
        console.log('Slave server is up.');
      }
    });
  };

  var slaveHandler = function(socket) {
    var data = '';
    socket.on('data', function(buf) {
      data += buf;
    });
    socket.on('end', function() {
      var obj = db.parse(data);
      createWorkspace(obj, counter);
      counter++;
    });
  };

  var createScratch = function(counter) {
    return static.mkdir('stage/' + counter);
  };

  var writeProgram = function(filename, code, counter) {
    return function() {
      return static.writeFile('stage/' + counter + '/' + filename, code);
    };
  };

  var writeInput = function(input, counter) {
    return function() {
      return static.writeFile('stage/' + counter + '/in.txt', input);
    };
  };

  var writeOutput = function(output, counter) {
    return function() {
      return static.writeFile('stage/' + counter + '/out.txt', output);
    };
  };

  var writeCompileScript = function(language, filename, counter) {
    var langHandler = require(config.languages[language]);
    var compileScript = langHandler.getCompileScript(filename, counter);
    return function() {
      return static.writeFile('stage/' + counter + '/compile.sh', compileScript);
    };
  };

  var execCompileScript = function(counter) {
    return function() {
      return static.exec('sh stage/' + counter + '/compile.sh');
    };
  };

  var readCompile = function(counter) {
    return function() {
      return static.readFile('stage/' + counter + '/err.txt');
    };
  };

  var checkCompile = function(id) {
    return function(data) {
      if ((data + "").trim() == "")
        return true;
      db.reportCompileFail(id, data + "");
      throw new Error("Compile Error");
    };
  };

  var writeRunScript = function(language, filename, counter) {
    var langHandler = require(config.languages[language]);
    var runScript = langHandler.getRunScript(filename, counter);
    return function() {
      return static.writeFile('stage/' + counter + '/run.sh', runScript);
    };
  };

  var execRunScript = function(counter) {
    return function() {
      return static.exec('sh stage/' + counter + '/run.sh');
    };
  };

  var readRunErrors = function(counter) {
    return function() {
      return static.readFile('stage/' + counter + '/err.txt');
    };
  };

  var checkRunErrors = function(id) {
    return function(data) {
      if ((data + "").trim() == "")
        return true;
      db.reportRunFail(id, data + "");
      throw new Error("Runtime Error");
    };
  };

  var readRunOutput = function(counter) {
    return function() {
      return static.readFile('stage/' + counter + '/tmp.txt');
    };
  };

  var checkRunOutput = function(id, output, matchLines, partial) {
    return function(data) {
      // TODO: actual output testing code
      // also write to the db here
      // that would be a db.reportResult(id, result) call.
      console.log(data + "");
      return db.reportResult(id, data + "");
    };
  };

  var reportDone = function() {
    var client = net.connect({ host: config.masterIP, port: config.masterPort },
    function() {
      client.end(name);
    });
  };

  var createWorkspace = function(obj, count) {
    // This is a perfect use case for promise.
    // Made the code sane enough to be read by humans.
    (function(i) {
      createScratch(i)
      .then(writeProgram(obj.filename, obj.code, i), reportError)
      .then(writeInput(obj.input, i), reportError)
      .then(writeCompileScript(obj.language, obj.filename, i), reportError)
      .then(execCompileScript(i), reportError)
      .then(readCompile(i), reportError)
      .then(checkCompile(obj.id), reportError)
      .then(writeRunScript(obj.language, obj.filename, i), reportError)
      .then(execRunScript(i), reportError)
      .then(readRunErrors(i), reportError)
      .then(checkRunErrors(obj.id), reportError)
      .then(readRunOutput(i), reportError)
      .then(checkRunOutput(obj.id, obj.output, obj.matchLines, obj.partial), reportError)
      .then(reportDone);
    })(count);
  };

  module.exports.createServer = createServer;
})();
