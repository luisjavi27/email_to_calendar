import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require("googleapis"),
    google = _require.google;

var calendarServices = {
  listEvents: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(auth) {
      var calendar, result, callApi, events;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              calendar = google.calendar({ version: "v3", auth: auth });
              result = [];
              callApi = undefined;
              _context.prev = 3;
              _context.next = 6;
              return calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime"
              });

            case 6:
              callApi = _context.sent;
              events = callApi.data.items;

              if (events.length) {
                events.forEach(function (event) {
                  var start = event.start.dateTime || event.start.date;
                  result.push(
                  // `Id: ${event.id}: Start Date: ${start} Event: ${event.summary}: ${event.description}`
                  "Id: " + event.id + ": Start Date: " + start + " Event: " + event.summary);
                });
              } else {
                result.push("No upcoming events found.");
              }
              return _context.abrupt("return", result);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", console.log("The API returned an error: " + callApi.err));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this, [[3, 12]]);
    }));

    function listEvents(_x) {
      return _ref.apply(this, arguments);
    }

    return listEvents;
  }(),

  insertEvent: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(auth) {
      var event, calendar, result, callApi;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              event = {
                summary: "Google I/O 2015", // title
                location: "800 Howard St., San Francisco, CA 94103",
                description: "A chance to hear more about Google's developer products.", // event detaill - description
                start: {
                  // start date
                  dateTime: "2022-08-20T14:00:00+00:00", // the +00:00 time let me use the timeZone indication
                  timeZone: "America/Bogota"
                },
                end: {
                  // end date
                  dateTime: "2022-08-20T17:00:00+00:00", // the +00:00 time let me use the timeZone indication
                  timeZone: "America/Bogota"
                },

                attendees: [// invitados
                { 'email': 'luisjavi27@gmail.com' }, { 'email': 'luisjavi27@hotmail.com' }],
                reminders: {
                  useDefault: false,
                  overrides: [{ method: "email", minutes: 24 * 60 }, { method: "popup", minutes: 10 }]
                }

              };
              calendar = google.calendar({ version: "v3", auth: auth });
              result = undefined;
              callApi = undefined;
              _context2.prev = 4;
              _context2.next = 7;
              return calendar.events.insert({
                auth: auth,
                calendarId: "primary", // could be another passing an calendar_id
                sendUdpates: "externalOnly",
                resource: event

              });

            case 7:
              callApi = _context2.sent;


              console.log("Event created: %s", callApi.data.htmlLink);
              console.log(callApi.data.description);

              return _context2.abrupt("return", callApi);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](4);

              console.log("There was an error contacting the Calendar service: " + _context2.t0);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[4, 13]]);
    }));

    function insertEvent(_x2) {
      return _ref2.apply(this, arguments);
    }

    return insertEvent;
  }()
};

module.exports = calendarServices;