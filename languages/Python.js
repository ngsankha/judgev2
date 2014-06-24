(function(filename, counter) {
  var getRunScript = function(filename, counter) {
    var script = "cd stage/" + counter + "\n"
               + "fakeroot chroot .\n"
               + "ulimit -Sv 50000000\n"
               + "python <in.txt 1>tmp.txt 2>err.txt\n"
               + "exit 0";
    return script;
  };

  module.exports.getRunScript = getRunScript;
})();
