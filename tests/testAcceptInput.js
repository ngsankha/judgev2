// Tests if codejudge runs programs that need input from stdin

function runTest() {
  lib.sendToMaster('AcceptInputC');
}

function checkResponse(data) {
  if (data.trim() === "1")
    lib.success("testAcceptInput.js");
  else
    lib.fail("testAcceptInput.js: Expected 1 but got " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
