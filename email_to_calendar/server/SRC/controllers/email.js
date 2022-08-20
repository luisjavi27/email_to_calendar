const fs = require("fs");
const { listEmail, getEmail } = require("../services/email");
const { authorize } = require("../services/auth");


const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH

function doFunction(callback, optional = null) {
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), callback, optional);
    // authorize(JSON.parse(content), getEmail);
  });
}