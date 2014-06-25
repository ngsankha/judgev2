(function(filename, counter) {
  var getRunScript = function(filename, time, counter) {
    var script = "cd stage/" + counter + "\n"
               + "ulimit -Sv 50000000\n"
               + "ulimit -St " + time + "\n"
               + (config.useFakeChroot ? "fakechroot" : "")
               + " python <in.txt 1>tmp.txt 2>err.txt\n"
               + "exit 0";
    return script;
  };

  module.exports.getRunScript = getRunScript;
})();
