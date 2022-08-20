const { google } = require("googleapis");

function listEmail(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    gmail.users.messages.list(
      {
        userId: "me",
  
        q: "label:unread",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const messages = res.data.messages;
        console.log(messages.length);
        if (messages.length) {
          console.log("Messages:");
          messages.forEach((message) => {
            doFunction(getEmail, message.id);
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
      (err, res) => {
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
  
          if (message.payload.parts !== undefined) {
            console.log("parts: ", res.data.payload.parts.length);
          } else {
            console.log("no parts");
          }
          // });
        } else {
          console.log("No message found.");
        }
      }
    );
  }

module.exports = { listEmail, getEmail };
