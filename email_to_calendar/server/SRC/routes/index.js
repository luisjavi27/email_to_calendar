var express = require('express');
var router = express.Router();
const calendarController = require("../controllers/calendar");
const emailController = require("../controllers/email");


/* GET home page. */
router.get('/listEvents', calendarController.listEvents);
router.get('/insertEvent', calendarController.insertEvent);

module.exports = router;
