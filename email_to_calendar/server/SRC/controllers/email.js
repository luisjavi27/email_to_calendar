const emailServices = require("../services/email");

const emailController = {
  getEmails: async (req, res) => {
    let { page, size, order, category } = req.query;
    const emailList = await emailServices.getEmails();
    if (emailList.error) {
      res.status(500);
      res.send(emailList);
    } else {
      res.status(200);
      res.send(emailList);
    }
  },

  getOneEmail: async (req, res) => {
    const email = await emailServices.getOneEmail(req.params.emailId);
    if (email.error) {
      res.status(500);
      res.send(email);
    } else {
      res.status(200);
      res.send(email);
    }
  },
  updateLabelsEmail: async (req, res) => {

    let { addLabel, removeLabel } = req.body
    let messageId = req.query.messageId

    const labels = await emailServices.updateLabelsEmail(messageId, addLabel, removeLabel);
    if (labels.error) {
      res.status(500); //pending from service
      res.send(labels);
    } else {
      res.status(200);
      res.send(labels);
    }
  },
  sendEmail: async (req, res) => {
    let { toEmail, subjectEmail, messageEmail } = req.body;
    const email = await emailServices.sendEmail(toEmail, subjectEmail, messageEmail);
    if (email.error) {
      res.status(500);
      res.send(email);
    } else {
      res.status(200);
      res.send(email);
    }
  },
};

module.exports = emailController;
