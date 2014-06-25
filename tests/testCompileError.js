// Tests if codejudge returns a compile error

function runTest() {
  lib.sendToMaster('CompileErrorC');
}

function checkResponse(data) {
  if (data.trim() === 'CompileError')
    return lib.success("testCompileError.js");
  return lib.fail("testCompileError.js: Expected a compile error but there was none");
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
