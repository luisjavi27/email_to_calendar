// const Imap = require('imap-simple');
const Imap = require('imap');
const { convert } = require('html-to-text');
// const { READ_MAIL_CONFIG } = require('../configuration');

const READ_MAIL_CONFIG = {
  imap: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    authTimeout: 10000,
    tls: process.env.EMAIL_TLS,
    tlsOptions: { rejectUnauthorized: false },
  },
};

const readMail = async () => {
  try {
    const connection = await Imap.connect(READ_MAIL_CONFIG);
    console.log('CONNECTION SUCCESSFUL', new Date().toString());
    const box = await connection.openBox('INBOX');
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };
    const results = await connection.search(searchCriteria, fetchOptions);
    results.forEach((res) => {
      const text = res.parts.filter((part) => {
        return part.which === 'TEXT';
      });
      let emailHTML = text[0].body;
      let emailText = convert(emailHTML);
      console.log(emailText);
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readMail,
};