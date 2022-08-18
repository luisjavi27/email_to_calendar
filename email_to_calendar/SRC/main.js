const { sendMail } = require('./email/services/send_email');
const { readMail } = require('./email/services/read_email');

const bootstrap = async () => {
  await sendMail();
  console.log('Now waiting for 10 seconds', new Date().toString());
  setTimeout(async () => {
    console.log('Fetching the newly send mail', new Date().toString());
    await readMail();
  }, 10000);
};

module.exports = bootstrap;