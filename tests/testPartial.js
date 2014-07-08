// Tests if codejudge successfully evaluates partially correct outputs

var testfile = "testPartial.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,        /* test file   */
                              "partial.c",     /* source file */
                              "C",             /* language    */
                              "",              /* input       */
                              "Hello\nWorld",  /* output      */
                              true,            /* match lines */
                              true,            /* partial     */
                              1                /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "0.5")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected 0.5 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
