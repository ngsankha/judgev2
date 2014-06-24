(function() {
  var parse = function(data) {
    // here is our custom db handling code.
    // return an object of the form:
    // { id: /* the unique id of the problem */,
    //   filename: /* the filename */,
    //   code: /* the code submitted */,
    //   language: /* the programming language */
    //   input: /* the input test data */,
    //   output: /* the output to be matched against */,
    //   matchLines: /* bool: to check if single lines are to be tested */,
    //   partial: /* if partial marks are for the problem */,
    //   time: /* maximum time (in seconds) allotted to the program */
    // }
  };

  var reportCompileFail = function(id, msg) {
    // code that handles the compile failure
    // do whatever you want to write to the db here
  };

  var reportRunFail = function(id, msg) {
    // code that handles the run failure
    // do whatever you want to write to the db here
  };

  var reportTLE = function(id) {
    // TLE reporting code here
  };

  var reportResult = function(id, msg) {
    // code that handles the result of the code
    // do whatever you want to write to the db here
  }

  module.exports.parse = parse;
  module.exports.reportCompileFail = reportCompileFail;
  module.exports.reportRunFail = reportRunFail;
  module.exports.reportResult = reportResult;
  module.exports.reportTLE = reportTLE;
})();