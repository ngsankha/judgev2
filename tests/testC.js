// Tests if codejudge successfully compiles and runs a C program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('hello_C');
}

function checkResponse(data) {
  if (data.trim() === "1")
    return lib.success("testC.js");
  return lib.fail("testC.js: Expected 1 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
