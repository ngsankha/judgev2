// Tests if codejudge handles a TLE program correctly

function runTest() {
  lib.sendToMaster('TLE');
}

function checkResponse(data) {
  if (data.trim() === "TLE")
    return lib.success("testTLE.js");
  return lib.fail("testTLE.js: Expected TLE but received " + data);
}

module.exports.runTest = runTest;
module.exports.checkResponse = checkResponse;
