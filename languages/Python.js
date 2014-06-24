(function(filename, counter) {
  var getRunScript = function(filename, counter) {
    // TODO: pay attention to security
    var script = "cd stage/" + counter + "\n"
               + "python <in.txt 1>tmp.txt 2>err.txt\n"
               + "exit 0";
    return script;
  };

  module.exports.getRunScript = getRunScript;
})();
