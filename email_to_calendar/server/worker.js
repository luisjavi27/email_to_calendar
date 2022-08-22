let fetch = require("node-fetch");
FormData = require("form-data");
let fs = require("fs");

async function worker() {
  try {
    console.log("worker started");
    config = fs.readFileSync(process.env.CONFIG_PATH);
    let { email, calendar } = JSON.parse(config);

    let getEmailsPromise = await fetch("http://localhost:3010/email/getEmails");
    let getEmails = await getEmailsPromise.json();

    // if(getEmails.data.length < 1) {return}
    // getEmails.data.forEach( async email => {
    let email2 = getEmails.data[0];
    const formData2 = new FormData();
    formData2.append("addLabel", "Label_8371537650923507914");
    formData2.append("removeLabel", "UNREAD");

    let emailsReaded = [];
    // console.log(formData2)
    const markEmailReadPromise = await fetch(
      `http://localhost:3010/email/updateLabels?messageId=${email2.id}`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          addLabel: "Label_8371537650923507914",
          removeLabel: "UNREAD",
        }),
      }
    );

    let markEmailRead = await markEmailReadPromise.json();
    emailsReaded.push(markEmailRead);

    // })
    const formData = new FormData();
    formData.append("toEmail", "luisjavi27@gmail.com");
    formData.append("subjectEmail", "hola");
    formData.append("messageEmail", "321654987");

    let sendEmailPromise = await fetch(
      "http://localhost:3010/email/sendEmail",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toEmail: "luisjavi27@gmail.com",
          subjectEmail: "hola",
          messageEmail: "321654987",
        }),
      }
    );

    let sendEmail = await sendEmailPromise.json();

    //  console.log(getEmails);
    console.log(sendEmail);
  } catch (error) {
    return console.log("Error loading config file:", error);
  }
}

worker();
process.exit;
