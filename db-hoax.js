(function() {
  var parse = function(data) {
    var code = "#include <stdio.h>\n" +
               "int main() {\n" +
               "printf(\"Hello World\\n\");\n" +
               "return 0;\n" +
               "}";
    return { id: 0,
             filename: "hello.c",
             code: code,
             language: "C",
             input: "",
             output: "Hello World",
             matchLines: false,
             partial: false
           };
  };

  var reportCompileFail = function(id, msg) {
    console.log(msg);
  };

  var reportRunFail = function(id, msg) {
    console.log(msg);
  };

  var reportResult = function(id, msg) {
    // code that handles the result of the code
    // do whatever you want to write to the db here
  }

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
  module.exports.reportResult = reportResult;
})();