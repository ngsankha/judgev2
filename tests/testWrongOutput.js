// Tests if codejudge successfully compiles and runs a C program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('WrongOutput');
}

function checkResponse(data) {
  if (data.trim() === "0")
    return lib.success("testWrongOutput.js");
  return lib.fail("testWrongOutput.js: Expected 0 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
