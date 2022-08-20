import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var calendarServices = require("../services/calendar");

var _require = require("../services/auth"),
    authorize = _require.authorize;

var calendarController = {
  listEvents: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {
      var auth, results;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              auth = authorize();
              _context.next = 3;
              return calendarServices.listEvents(auth);

            case 3:
              results = _context.sent;

              res.render("react", { results: results });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    function listEvents(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return listEvents;
  }(),

  insertEvent: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {
      var auth, result;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              auth = authorize();
              _context2.next = 3;
              return calendarServices.insertEvent(auth);

            case 3:
              result = _context2.sent;

              res.render("index2", { result: result });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    function insertEvent(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return insertEvent;
  }()
};

module.exports = calendarController;