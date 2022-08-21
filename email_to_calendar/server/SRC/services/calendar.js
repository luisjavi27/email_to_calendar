const { google } = require("googleapis");
const { authorize } = require("./auth");

const auth = authorize();

const calendarServices = {
  getEvents: async () => {
    const calendar = google.calendar({ version: "v3", auth });
    let result = [];
    let callApi = undefined;
    try {
      callApi = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = callApi.data.items;
      if (events.length) {
        events.forEach((event) => {
          const start = event.start.dateTime || event.start.date;
          result.push(
            `Id: ${event.id}: Start Date: ${start} Event: ${event.summary}`
          );
        });
      } else {
        result.push("No upcoming events found.");
      }
      return { data: result };
    } catch (error) {
      return { Error: { code: 500, data: error.toString() } };
    }
  },

  createEvent: async () => {
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
        dateTime: "2022-08-20T17:00:00+00:00", // the +00:00 time let me use the timeZone indication
        timeZone: "America/Bogota",
      },

      attendees: [
        // invitados
        { email: "luisjavi27@gmail.com" },
        { email: "luisjavi27@hotmail.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    const calendar = google.calendar({ version: "v3", auth });
    let callApi = undefined;

    try {
      callApi = await calendar.events.insert({
        auth: auth,
        calendarId: "primary", // could be another passing an calendar_id
        sendUdpates: "externalOnly",
        resource: event,
      });

      return {
        data: {
          Event: callApi.data.description,
          Link: callApi.data.htmlLink,
        },
      };
    } catch (error) {
      return { Error: { code: 500, data: error.toString() } };
    }
  },
};

module.exports = calendarServices;
