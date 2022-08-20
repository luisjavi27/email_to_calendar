var fs = require("fs");

var _require = require("googleapis"),
    google = _require.google;

var readline = require("readline");

var CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;
var TOKEN_PATH = process.env.TOKEN_PATH;
var SCOPES = process.env.SCOPES;

function authorize() {
  var credentials = undefined;
  try {
    credentials = fs.readFileSync(CREDENTIALS_PATH);
  } catch (error) {
    return console.log("Error loading client secret file:", error);
  }

  credentials = JSON.parse(credentials);
  var _credentials$installe = credentials.installed,
      client_secret = _credentials$installe.client_secret,
      client_id = _credentials$installe.client_id,
      redirect_uris = _credentials$installe.redirect_uris;

  var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  var token = undefined;

  try {
    token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (error) {
    console.log("error in service auth");
    getNewToken(oAuth2Client);
    return;
  }
}

function getNewToken(oAuth2Client) {
  var authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", function (code) {
    rl.close();
    oAuth2Client.getToken(code, function (err, token) {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);

      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

module.exports = { authorize: authorize };