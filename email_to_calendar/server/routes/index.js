var express = require('express');
var router = express.Router();
var calendarController = require("../controllers/calendar");
var emailController = require("../controllers/email");

/* GET home page. */
router.get('/listEvents', calendarController.listEvents);
router.get('/insertEvent', calendarController.insertEvent);

module.exports = router;