// Tests if codejudge successfully compiles and runs a C program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('hello_C');
}

function checkResponse(data) {
  if (data.trim() === 'Hello World')
    lib.success("testc.js");
  else
    lib.fail("testc.js: Expected Hello World but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;