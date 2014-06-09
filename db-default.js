(function() {
  var parse = function(data) {
    // here is our custom db handling code.
    // return an object of the form:
    // { filename: /* the filename */,
    //   code: /* the code submitted */,
    //   language: /* the programming language */
    //   input: /* the input test data */,
    //   output: /* the output to be matched against */
    //   matchLines: /* bool: to check if single lines are to be tested */
    //   partial: /* if partial marks are for the problem */
    // }
  };

  var reportCompileFail = function(msg) {
    // code that handles the compile failure
    // do whatever you want to write to the db here
  };

  var reportRunFail = function(msg) {
    // code that handles the run failure
    // do whatever you want to write to the db here
  };

  var reportResult = function(msg) {
    // code that handles the result of the code
    // do whatever you want to write to the db here
  }

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
})();