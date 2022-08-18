module.exports.READ_MAIL_CONFIG = {
    imap: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      authTimeout: 10000,
      tls: process.env.EMAIL_TLS,
      tlsOptions: { rejectUnauthorized: false },
    },
  };
  
  module.exports.SEND_MAIL_CONFIG = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };