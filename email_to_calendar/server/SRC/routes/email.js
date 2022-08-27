var express = require('express');
var router = express.Router();
const emailController = require("../controllers/email");
 

/* GET home page. */
router.get('/getEmails', emailController.getEmails);
router.get('/getOneEmail/:messageId', emailController.getOneEmail);

router.post('/updateLabels/:messageId', emailController.updateLabelsEmail);
router.post('/sendEmail', emailController.sendEmail);

module.exports = router;
