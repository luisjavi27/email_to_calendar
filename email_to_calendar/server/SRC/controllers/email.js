const emailServices = require("../services/email");

const emailController = {
  getEmails: async (req, res) => {
    const emailList = await emailServices.getEmails();
    if (emailList.error == undefined) {
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
};

module.exports = emailController;
