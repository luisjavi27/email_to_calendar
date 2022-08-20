const calendarServices = require("../services/calendar");
const { authorize } = require("../services/auth");

const calendarController = {
  listEvents: async (req, res) => {
    const auth =  authorize();
    const results =  await calendarServices.listEvents(auth);
    res.render("index", { results });
  },

  insertEvent:async (req, res) => {
    const auth =  authorize();
    const result =  await calendarServices.insertEvent(auth);
    res.render("index2", { result });

  },
};

module.exports = calendarController;
