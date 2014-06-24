(function() {
  var net = require('net');

  var parse = function(data) {
    switch (data) {
      case 'hello_C': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "printf(\"Hello World\\n\");\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "Hello World",
                 matchLines: false,
                 partial: false
               };
      }

      case 'CompileErrorC': {
        var code = "int main() {";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "Hello World",
                 matchLines: false,
                 partial: false
               };
      }
    }
  };

  var reportCompileFail = function(id, msg) {
    var client = net.connect({ host: 'localhost', port: 2359 },
      function() {
        client.end("CompileError");
      });
  };

  var reportRunFail = function(id, msg) {
    var client = net.connect({ host: 'localhost', port: 2359 },
      function() {
        client.end("RuntimeError");
      });
  };

  var reportResult = function(id, msg) {
    var client = net.connect({ host: 'localhost', port: 2359 },
      function() {
        client.end(msg);
      });
  };

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
  module.exports.reportResult = reportResult;
})();