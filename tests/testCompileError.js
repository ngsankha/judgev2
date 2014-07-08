// Tests if codejudge returns a compile error

var testfile = "testCompileError.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "compileErr.c",  /* source file */
                              "C",             /* language    */
                              "",              /* input       */
                              "",              /* output      */
                              false,           /* match lines */
                              false,           /* partial     */
                              1                /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "CompileError")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected CompileError but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
