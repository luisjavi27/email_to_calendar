const { google } = require("googleapis");
const { authorize } = require("./auth");
const fs = require("fs");
const ics = require("ics");
const { convert } = require('html-to-text');

const auth = authorize();

const emailServices = {
  getEmails: async () => {
    const labels = `from:<luis.iglesias.dev@gmail.com> is:unread is:INBOX`; // could get filter parameters by query or body

    const gmail = google.gmail({ version: "v1", auth });
    let callApi = undefined;
    try {
      callApi = await gmail.users.messages.list({
        userId: "me",
        q: labels,
      });

      if (callApi.data.resultSizeEstimate > 0) {
        const messages = callApi.data.messages;
        if (messages.length != undefined) {
          messages.forEach((message) => {
            message.link = `http://localhost:3010/email/getOneEmail/${message.id}`;
          });
          return { data: messages };
        } else {
          messages.link = `http://localhost:3010/email/getOneEmail/${message.id}`;
          return { data: messages };
        }
      }
      return { data: [] };
    } catch (error) {
      return { error: { code: 500, data: error.toString() } };
    }
  },

  getOneEmail: async (messageId) => {
    const gmail = google.gmail({ version: "v1", auth });
    let callApi = undefined;
    var message = undefined;
    try {
      callApi = await gmail.users.messages.get({
        userId: "me",
        id: messageId,
      });
      if (callApi.data.payload.mimeType == "multipart/alternative") {
        callApi.data.payload.parts.forEach((part) => {
          if (part.mimeType == "text/html") {
            message = part;
          }
        });
      } else {
        message = callApi.data.payload;
      }

      // if (message.mimeType == "text/html") {
      if (message.body.size > 0) {
        let body = Buffer.from(message.body.data, "base64").toString("utf-8");

        body =  convert(body, {
          wordwrap: 130,
          whitespaceCharacters:"\r\n"
        });

        const ContentType = callApi.data.payload.headers.find(
          (header) => header.name == "Content-Type"
        );
        const subject = callApi.data.payload.headers.find(
          (header) => header.name == "Subject"
        );
        const from = callApi.data.payload.headers.find(
          (header) => header.name == "From"
        );
        const to = callApi.data.payload.headers.find(
          (header) => header.name == "To"
        );
        const date = callApi.data.payload.headers.find(
          (header) => header.name == "Date"
        );
        const labels = callApi.data.payload.labelIds;

        if (callApi.data.parts !== undefined) {
          return {
            data: {
              Date: date.value,
              From: from.value,
              To: to.value,
              Labels: labels,
              Subject: subject.value,
              message: body,
              ContentType: ContentType.value,
              parts: message.data.payload.parts.length,
              markRead: `http://localhost:3010/email/updateLabels?messageId=${messageId}&addLabel=read&removeLabel=UNREAD`,
            },
          };
        }
        return {
          data: {
            Date: date.value,
            From: from.value,
            To: to.value,
            Labels: labels,
            Subject: subject.value,
            message: body,
            ContentType: ContentType.value,
            markRead: `http://localhost:3010/email/updateLabels?messageId=${messageId}`,
          },
        };
      } else {
        return { Error: { code: 404, data: message } };
      }
    } catch (error) {
      return { error: { code: 500, data: error.toString() } };
    }
  },
  updateLabelsEmail: async (messageId, addLabel, removeLabel) => {
    const gmail = google.gmail({ version: "v1", auth });
    let callApi = undefined;

    try {
      callApi = await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        requestBody: {
          addLabelIds: [addLabel],
          removeLabelIds: [removeLabel],
        },
      });
      const message = callApi;
      console.log(message);
      if (message) {
        return { Data: message.data };
      } else {
        return { error: { code: 500, data: message } };
      }
    } catch (error) {
      return { error: { code: 500, data: error } };
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

  sendEmail: async (toEmail, subjectEmail, messageEmail) => {
    try {
      console.log(toEmail, subjectEmail, messageEmail);
      const gmail = google.gmail({ version: "v1", auth });

      const subject = `${subjectEmail}`;
      const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
        "base64"
      )}?=`;
      const messageParts = [
        `From: Luis javier Iglesias <luis.iglesias.dev@gmail.com>`, // necessary, call from config.json
        `To: <${toEmail}>`,
        "Content-Type: text/html; charset=utf-8",
        "MIME-Version: 1.0",
        `Subject: ${utf8Subject}`,
        "",
        `${messageEmail}`,
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
