const calendarServices = require("../services/calendar");

const calendarController = {
  getEvents: async (req, res) => {
    const eventList = await calendarServices.getEvents();
    if (eventList.error) {
      res.status(500);
      res.send(eventList);
    } else {
      res.status(200);
      res.send(eventList);
    }
  },

  createEvent: async (req, res) => {
    const eventCreated = await calendarServices.createEvent();
    if (eventCreated.error) {
      res.status(500);
      res.send(eventCreated);
    } else {
      res.status(200);
      res.send(eventCreated);
    }
  },
};

module.exports = calendarController;
