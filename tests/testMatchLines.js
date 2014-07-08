// Tests if codejudge successfully matches individual lines in output

var testfile = "testMatchLines.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "matchLines.c",  /* source file */
                              "C",             /* language    */
                              "",              /* input       */
                              "Hello\nWorld",  /* output      */
                              true,           /* match lines */
                              false,           /* partial     */
                              1                /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "1")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected 1 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
