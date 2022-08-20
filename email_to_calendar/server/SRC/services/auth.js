const fs = require("fs");
const { google } = require("googleapis");
const readline = require("readline");

const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH;
const TOKEN_PATH = process.env.TOKEN_PATH;
const SCOPES = process.env.SCOPES;

function authorize() {
  let credentials = undefined;
  try {
    credentials = fs.readFileSync(CREDENTIALS_PATH);
  } catch (error) {
    return console.log("Error loading client secret file:", error);
  }

  credentials = JSON.parse(credentials);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  let token = undefined;

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
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
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

module.exports = { authorize };
