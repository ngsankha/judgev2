// Tests if codejudge successfully compiles and runs a C program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('Partial');
}

function checkResponse(data) {
  if (data.trim() === "0.5")
    return lib.success("testPartial.js");
  return lib.fail("testPartial.js: Expected 0.5 but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
