var fs = require("fs");

var _require = require("../services/email"),
    listEmail = _require.listEmail,
    getEmail = _require.getEmail;

var _require2 = require("../services/auth"),
    authorize = _require2.authorize;

var CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;

function doFunction(callback) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  fs.readFile(CREDENTIALS_PATH, function (err, content) {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), callback, optional);
    // authorize(JSON.parse(content), getEmail);
  });
}