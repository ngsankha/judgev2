// Tests if codejudge can handle runtime errors in programs

var testfile = "testRuntimeError.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "runtimeErr.c",  /* source file */
                              "C",             /* language    */
                              "45",            /* input       */
                              "",              /* output      */
                              false,           /* match lines */
                              false,           /* partial     */
                              1                /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "RuntimeError")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected RuntimeError but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
