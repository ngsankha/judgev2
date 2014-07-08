// Tests if codejudge successfully compiles and runs a C program
// that gives the wrong output.

var testfile = "testWrongOutput.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "wrongOut.c",    /* source file */
                              "C",             /* language    */
                              "",              /* input       */
                              "Hello World",   /* output      */
                              false,           /* match lines */
                              false,           /* partial     */
                              1                /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "0")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected 0 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
