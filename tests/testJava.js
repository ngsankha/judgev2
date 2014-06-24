// Tests if codejudge successfully compiles and runs a java program
// that does not require any user input.

function runTest() {
  lib.sendToMaster('HelloJava');
}

function checkResponse(data) {
  if (data.trim() === 'Hello World')
    lib.success("testJava.js");
  else
    lib.fail("testJava.js: Expected Hello World but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;