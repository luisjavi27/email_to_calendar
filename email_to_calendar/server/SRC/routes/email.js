var express = require('express');
var router = express.Router();
const emailController = require("../controllers/email");


/* GET home page. */
router.get('/getEmails', emailController.getEmails);
router.get('/getOneEmail/:emailId', emailController.getOneEmail);

module.exports = router;
