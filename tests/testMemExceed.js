// Tests if codejudge stops a memory hog program from running

var testfile = "testMemExceed.js";

function runTest() {
  lib.sendToMaster(testfile);
}

function dbResponse() {
  return lib.createDbResponse(testfile,           /* test file   */
                              "memExceed.c",      /* source file */
                              "C",                /* language    */
                              "",                 /* input       */
                              "",                 /* output  */
                              false,              /* match lines */
                              false,              /* partial     */
                              1                   /* time limit  */);
}

function checkResponse(data) {
  if (data.trim() === "TLE")
    return lib.success(testfile);
  return lib.fail(testfile + ": Expected TLE but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
module.exports.dbResponse = dbResponse;
