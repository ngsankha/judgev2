// Tests if codejudge successfully compiles and runs a C program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('hello_C');
}

function checkResponse(data) {
  if (data.trim() === "1")
    lib.success("testC.js");
  else
    lib.fail("testC.js: Expected 1 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
