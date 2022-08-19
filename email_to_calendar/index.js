const {PubSub} = require('@google-cloud/pubsub');
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = "token.json";

function doFunction(callback, optional=null) {

  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
     authorize(JSON.parse(content), callback, optional);
    // authorize(JSON.parse(content), getEmail);
  });
}

function authorize(credentials, callback, optional=null) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    if(optional==null){
      callback(oAuth2Client);
    }else{
      callback(oAuth2Client, optional)
    }
    
  });
}

function getNewToken(oAuth2Client, callback) {
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
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

doFunction(listEmail)

  function listEmail(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.messages.list(
    {
      userId: "me",
      
        q: "label:unread",
      
    },
    (err, res) =>  {
      if (err) return console.log("The API returned an error: " + err);
      const messages = res.data.messages;
       console.log(messages.length)
      if (messages.length) {
        console.log("Messages:");
        messages.forEach((message, ) => {
          
        doFunction(getEmail, message.id )
        });
      } else {
        console.log("No message found.");
      }
    }
  );
}

 function getEmail(auth, messageId) {
  const gmail = google.gmail({ version: "v1", auth });
   gmail.users.messages.get(
    {
      userId: "me",
      id: messageId,
    },
    (err, res)  => {
      if (err) return console.log("The API returned an error: " + err);
      const message = res.data;
      // console.log("headers: ",res.data.payload.headers)
      // console.log("body: ", res.data.payload.body)
      
      if (message) {
        // message.payload.headers.forEach((header, index) => {console.log(index," header: ", header);})
        // message.snippets.forEach((part) => {
          // const base64 = part.body.data;
          // const buff = Buffer.from(base64, "base64");
          // const str = buff.toString("utf-8");

          console.log("-- ", message.snippet);
          
          if(message.payload.parts !== undefined){
            console.log("parts: ", res.data.payload.parts.length)
          }else{
            console.log("no parts")
          }
        // });
      } else {
        console.log("No message found.");
      }
    }
  );
}

