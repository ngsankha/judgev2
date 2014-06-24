// Tests if codejudge can handle runtime errors in programs

function runTest() {
  lib.sendToMaster('RuntimeErrorC');
}

function checkResponse(data) {
  if (data.trim() === 'RuntimeError')
    lib.success("testRuntimeError.js");
  else
    lib.fail("testRuntimeError.js: Expected a runtime error but there was none");
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
