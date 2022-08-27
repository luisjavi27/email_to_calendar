let fetch = require("node-fetch");
FormData = require("form-data");
let fs = require("fs");

async function worker() {
  try {
    config = fs.readFileSync(process.env.CONFIG_PATH);
    let { email, calendar } = JSON.parse(config);

    let getEmailsIdPromise = await fetch(
      "http://localhost:3010/email/getEmails"
    );
    let getEmailsId = await getEmailsIdPromise.json();

    if (getEmailsId.data.length < 1) {
      return;
    }
    for (let i = 0; i < getEmailsId.data.length; i++) {
      let messageId = getEmailsId.data[i].id;
      let oneEmailUnreadPromise = await fetch(
        `http://localhost:3010/email/getOneEmail/${messageId}`
      );
      let oneEmailUnread = await oneEmailUnreadPromise.json();

      let bodyPart = oneEmailUnread.data.message;
      let index1 = bodyPart.indexOf("------- Internal use --------------\n");
      let index2 = bodyPart.indexOf("\nSubmission date", index1);

      let bodyEvent = bodyPart.slice(0, index1).trim();

      let titleEvent = bodyPart.slice(index1, index2);
      titleEvent = titleEvent
        .replace("------- Internal use --------------\n", "")
        .trim();

      let index3 = bodyPart.indexOf("Landing date: ");
      let index4 = bodyPart.indexOf("Pick up Flight number: ", index3);

      let startDate = bodyPart.slice(index3 + 14, index3 + 24).trim();
      let startTime = bodyPart.slice(index3 + 38, index4).trim();
      let endTime = startTime.split(":");
      endTime[0] = parseInt(endTime[0]) + 1;

      let index5 = bodyPart.indexOf("Email:");
      let index6 = bodyPart.indexOf(" ", index5);
      let userEmail = bodyPart.slice(index5 + 7, index6).trim();

      let event = {
        summary: titleEvent,
        description: bodyEvent,
        start: {
          // start date
          dateTime: `${startDate}T${startTime}:00+00:00`, // the +00:00 time let me use the timeZone indication
          timeZone: "America/Bogota",
        },
        end: {
          // end date
          dateTime: `${startDate}T${endTime[0]}:${endTime[1]}:00+00:00`, // the +00:00 time let me use the timeZone indication
          timeZone: "America/Bogota",
        },

        attendees: [
          // invitados
          { email: "luis.iglesias.dev@gmail.com" },
          // { email: "luisjavi27@gmail.com" },
          { email: userEmail },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      };

      const createEventPromise = await fetch(
        `http://localhost:3010/calendar/createEvent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event }),
        }
      );
      let createEvent = await createEventPromise.json();

      if (createEvent.data.Link == undefined) {
        return;
      }

      const markEmailReadPromise = await fetch(
        `http://localhost:3010/email/updateLabels/${messageId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addLabel: "Label_8371537650923507914",
            removeLabel: "UNREAD",
          }),
        }
      );

      let markEmailRead = await markEmailReadPromise.json();

      console.log("readed", markEmailRead);

      let sendEmailPromise = await fetch(
        "http://localhost:3010/email/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toEmail: userEmail,
            // toEmail: "luis.iglesias.dev@gmail.com",
            subjectEmail: "Colombian Quest S.A.S - confirmación",
            messageEmail:
              "Hola, recibimos tu solicitud y pronto nos pondremos en contacto contigo,\n te enviamos a tu calendario un evento para que reserves la fecha de tu solicitud 😊 ✈ 🚗",
          }),
        }
      );

      let sendEmail = await sendEmailPromise.json();

      console.log(sendEmail);
    }
  } catch (error) {
    return console.log("Error loading config file:", error);
  }
}

let codes = JSON.parse(fs.readFileSync("countryCodes.json", "utf8") )

Object.entries(codes).forEach((code)=>{
  // console.log(code[0], code[1]);
})

async function dep () {
  let depMun ={}
  let departmentsPromise = await fetch(
    `https://www.datos.gov.co/resource/95qx-tzs7.json`
    );
    let departments = await departmentsPromise.json();
    // console.log(departments);
    departments.forEach((department)=>{
      if(depMun[department.departamento]== undefined){
        depMun[department.departamento]=[department.municipio]
      }else{
        depMun[department.departamento].push(department.municipio);
      }
      
    }
    )
    console.log(list)
    return depMun
  }
  
   let list =   dep()
  

// worker();
process.exit;
