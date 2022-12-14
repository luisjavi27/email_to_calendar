require("dotenv").config();
const { fork } = require("child_process");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const emailRouter = require("./SRC/routes/email");
const calendarRouter = require("./SRC/routes/calendar");

let timeout = 60000;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/email", emailRouter);
app.use("/calendar", calendarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;

  res.status(err.status || 500);
  res.send({ "Error: ": err });
});

rutine();

function rutine() {
  fork("./server/worker.js")
   setTimeout(rutine, timeout);
}

module.exports = app;
