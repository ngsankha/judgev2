// Tests if codejudge handles a TLE program correctly

function runTest() {
  lib.sendToMaster('TLE');
}

function checkResponse(data) {
  if (data.trim() === "TLE")
    lib.success("testTLE.js");
  else
    lib.fail("testTLE.js: Expected TLE but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
