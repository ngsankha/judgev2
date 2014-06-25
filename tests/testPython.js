// Tests if codejudge successfully compiles and runs a Python program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('HelloPython');
}

function checkResponse(data) {
  if (data.trim() === "1")
    return lib.success("testPython.js");
  return lib.fail("testPython.js: Expected 1 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
