// Tests if codejudge successfully compiles and runs a C++ program
// that does not require any user input.

var testfile = "testCPP.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "hello.cpp",     /* source file */
                              "CPP",           /* language    */
                              "",              /* input       */
                              "Hello World",   /* output      */
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
