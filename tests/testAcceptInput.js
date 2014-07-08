// Tests if codejudge runs programs that need input from stdin

var testfile = "testAcceptInput.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "acceptInput.c", /* source file */
                              "C",             /* language    */
                              "45",            /* input       */
                              "45",            /* output      */
                              false,           /* match lines */
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
