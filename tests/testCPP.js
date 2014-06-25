// Tests if codejudge successfully compiles and runs a C++ program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('HelloCPP');
}

function checkResponse(data) {
  if (data.trim() === "1")
    return lib.success("testCPP.js");
  return lib.fail("testCPP.js: Expected 1 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
