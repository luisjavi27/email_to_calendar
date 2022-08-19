const { PubSub } = require("@google-cloud/pubsub");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];
const TOKEN_PATH = "credentials/token.json";
const CREDENTIALS_PATH = "credentials/credentials.json";

function doFunction(callback, optional = null) {
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), callback, optional);
    // authorize(JSON.parse(content), getEmail);
  });
}

function authorize(credentials, callback, optional = null) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    if (optional == null) {
      callback(oAuth2Client);
    } else {
      callback(oAuth2Client, optional);
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
doFunction(insertEvent);
doFunction(listEvents);

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(
            `Id: ${event.id}: Start Date: ${start} Event: ${event.summary}: ${event.description}`
          );
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

function insertEvent(auth) {
  let event = {
    summary: "Google I/O 2015", // title
    location: "800 Howard St., San Francisco, CA 94103",
    description: "A chance to hear more about Google's developer products.", // event detaill - description
    start: {
      // start date
      dateTime: "2022-08-20T14:00:00+00:00", // the +00:00 time let me use the timeZone indication
      timeZone: "America/Bogota",
    },
    end: {
      // end date
      dateTime: "2022-08-20T17:00:00+00:00",// the +00:00 time let me use the timeZone indication
      timeZone: "America/Bogota",
    },
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees': [ // invitados
    //   {'email': 'lpage@example.com'},
    //   {'email': 'sbrin@example.com'},
    // ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary", // could be another passing an calendar_id
      sendUdpates: "all",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.htmlLink);
    }
  );
}
