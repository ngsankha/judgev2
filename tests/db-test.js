(function() {
  var net = require('net');

  var pingHarness = function(data) {
    var client = net.connect({ host: 'localhost', port: 2359 },
      function() {
        client.end(data);
      });
    client.on('error', function(err) {
      console.log(err);
    });
  };

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
                 partial: false,
                 time: 1
               };
      }

      case 'CompileErrorC': {
        var code = "int main() {";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }

      case 'RuntimeErrorC': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "int i;\n" +
                   "scanf(\"%d\", i);\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "45",
                 output: "",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }

      case 'AcceptInputC': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "int i;\n" +
                   "scanf(\"%d\", &i);\n" +
                   "printf(\"%d\\n\", i);\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "45",
                 output: "45",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }

      case 'HelloJava': {
        var code = "class Hello {\n" +
                   "public static void main(String args[]) {\n" +
                   "System.out.println(\"Hello World\");\n" +
                   "}\n" +
                   "}";
        return { id: data,
                 filename: "Hello.java",
                 code: code,
                 language: "Java",
                 input: "",
                 output: "Hello World",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }

      case 'WrongOutput': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "printf(\"Hello\\n\");\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "Hello World",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }

      case 'MatchLines': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "printf(\"Hello \\nWorld\\n\");\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "Hello\nWorld",
                 matchLines: true,
                 partial: false,
                 time: 1
               };
      }

      case 'Partial': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "printf(\"Hello \\nBoom\\n\");\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "Hello\nWorld",
                 matchLines: true,
                 partial: true,
                 time: 1
               };
      }

      case 'TLE': {
        var code = "#include <stdio.h>\n" +
                   "int main() {\n" +
                   "while(1);\n" +
                   "return 0;\n" +
                   "}";
        return { id: data,
                 filename: "hello.c",
                 code: code,
                 language: "C",
                 input: "",
                 output: "",
                 matchLines: false,
                 partial: false,
                 time: 1
               };
      }
    }
  };

  var reportCompileFail = function(id, msg) {
    pingHarness("CompileError");
  };

  var reportRunFail = function(id, msg) {
    pingHarness("RuntimeError");
  };

  var reportTLE = function(id) {
    pingHarness("TLE");
  };

  var reportResult = function(id, msg) {
    pingHarness(msg);
  };

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
  module.exports.reportResult = reportResult;
  module.exports.reportTLE = reportTLE;
})();