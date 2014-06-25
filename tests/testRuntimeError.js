// Tests if codejudge can handle runtime errors in programs

function runTest() {
  lib.sendToMaster('RuntimeErrorC');
}

function checkResponse(data) {
  if (data.trim() === 'RuntimeError')
    return lib.success("testRuntimeError.js");
  return lib.fail("testRuntimeError.js: Expected a runtime error but there was none");
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
