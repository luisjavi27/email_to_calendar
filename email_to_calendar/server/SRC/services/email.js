const { google } = require("googleapis");
const { authorize } = require("./auth");
const fs = require("fs");
const ics = require("ics");

const auth = authorize();

const emailServices = {
  getEmails: async () => {
    const gmail = google.gmail({ version: "v1", auth });
    let callApi = undefined;
    try {
      callApi = await gmail.users.messages.list({
        userId: "me",
        q: "label:unread",
      });

      const messages = callApi.data.messages;

      if (messages.length) {
        messages.forEach((message) => {
          message.link = `http://localhost:3010/email/getOneEmail/${message.id}`;
        });
        return { data: messages };
      } else {
        return { error: { code: 400, data: messages } };
      }
    } catch (error) {
      return { error: { code: 500, data: error.toString() } };
    }
  },

  getOneEmail: async (messageId) => {
    const gmail = google.gmail({ version: "v1", auth });
    let callApi = undefined;
    try {
      callApi = await gmail.users.messages.get({
        userId: "me",
        id: messageId,
      });
      const message = callApi.data;

      if (message) {
        const body = Buffer.from(message.payload.body.data, "base64").toString(
          "utf-8"
        );

        const ContentType = message.payload.headers.find(
          (header) => header.name == "Content-Type"
        );
        const subject = message.payload.headers.find(
          (header) => header.name == "Subject"
        );
        const from = message.payload.headers.find(
          (header) => header.name == "From"
        );
        const to = message.payload.headers.find(
          (header) => header.name == "To"
        );

        const date = message.payload.headers.find(
          (header) => header.name == "Date"
        );

        if (message.payload.parts !== undefined) {
          return {
            data: {
              Date: date.value,
              From: from.value,
              To: to.value,
              Subject: subject.value,
              message: body,
              ContentType: ContentType.value,
              parts: res.data.payload.parts.length,
            },
          };
        }
        return {
          data: {
            Date: date.value,
            From: from.value,
            To: to.value,
            Subject: subject.value,
            message: body,
            ContentType: ContentType.value,
          },
        };
      } else {
        return { Error: { code: 404, data: error.toString() } };
      }
    } catch (error) {
      return { error: { code: 500, data: error.toString() } };
    }
  },

  createIcsFile: async () => {
    try {
      const createFile = ics.createEvent({
        title: "Dinner",
        description: "Nightly thing I do",
        busyStatus: "FREE",
        start: [2018, 1, 15, 6, 30],
        duration: { minutes: 50 },
      });

      if (createFile) {
        fs.writeFileSync(`${__dirname}../icsFiles/event.ics`, value);

        return { Data: { Status: "File created successfully" } };
      } else {
        return { Error: { code: 400, data: error.toString() } };
      }
    } catch (error) {
      return { Error: { code: 500, data: error.toString() } };
    }
  },

  sendEmail: async () => {
    try {
      // const gmail = google.gmail('v1');
      // google.options({auth});

      const gmail = google.gmail({ version: "v1", auth });

      const subject = "🤘 Hello 🤘";
      const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
        "base64"
      )}?=`;
      const messageParts = [
        "From: Luis javier Iglesias <luis.iglesias.dev@google.com>", // necessary, call from config.json
        "To: <luisjavi27@gmail.com>", 
        "Content-Type: text/html; charset=utf-8",
        "MIME-Version: 1.0",
        `Subject: ${utf8Subject}`,
        "",
        "This is a message just to say hello.",
        "So... <b>Hello!</b>  🤘❤️😎",
      ];
      const message = messageParts.join("\n");

      // The body needs to be base64url encoded.
      const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });
      console.log(res.data);
      return { data: res.data };
    } catch (error) {
      return { error: { code: 500, data: error.toString() } };
    }
  },
};

module.exports = emailServices;
