// Tests if codejudge returns a compile error

function runTest() {
  lib.sendToMaster('CompileErrorC');
}

function checkResponse(data) {
  if (data.trim() === 'CompileError')
    lib.success("testCompileError.js");
  else
    lib.fail("testCompileError.js: Expected a compile error but there was none");
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;