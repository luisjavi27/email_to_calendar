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

  createEvent: async (event) => {
   
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
