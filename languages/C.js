(function(filename, counter) {
  var getCompileScript = function(filename, counter) {
    var script = "cd stage/" + counter + "\n"
               + "gcc -lm " + filename + " 2>err.txt\n"
               + "exit 0";
    return script;
  };

  var getRunScript = function(filename, counter) {
    var script = "cd stage/" + counter + "\n"
               + "./a.out <in.txt 1>tmp.txt 2>err.txt\n"
               + "exit 0";
    return script;
  };

  module.exports.getCompileScript = getCompileScript;
  module.exports.getRunScript = getRunScript;
})();
