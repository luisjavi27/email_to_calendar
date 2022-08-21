var express = require('express');
var router = express.Router();
const calendarController = require("../controllers/calendar");


/* GET home page. */
router.get('/getEvents', calendarController.getEvents);
router.get('/createEvent', calendarController.createEvent);

module.exports = router;
