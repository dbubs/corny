"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _config = require('./config');

var _field = require('./field');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var format = _util2.default.format;
var debug = false;

var Corny = function (_Config) {
  _inherits(Corny, _Config);

  function Corny(val) {
    _classCallCheck(this, Corny);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Corny).call(this));

    _this.val = val.toUpperCase();

    // populated in this._parse()
    _this.fields = {};

    _this._parse(val);
    _this.phrase = _this.toString();
    return _this;
  }

  // borrowed and slightly modified from https://github.com/harrisiirak/cron-parser


  _createClass(Corny, [{
    key: '_parseField',
    value: function _parseField(field, value, constraints) {

      var self = this;
      var safeIsNaN = Number.isNaN;

      // Replace aliases
      switch (field) {
        case 'month':
        case 'dayOfWeek':
          var aliases = self.aliases[field];

          value = value.replace(/[a-z]{1,3}/gi, function (match) {
            match = match.toLowerCase();

            if (_typeof(aliases[match]) !== undefined) {
              return aliases[match];
            } else {
              throw new Error('Cannot resolve alias "' + match + '"');
            }
          });
          break;
      }

      // Check for valid characters.
      if (!/^[\d|/|*|\-|,]+$/.test(value)) {
        throw new Error('Invalid characters, got value: ' + value);
      }

      // Replace '*'
      if (value.indexOf('*') !== -1) {
        value = value.replace(/\*/g, constraints.join('-'));
      }

      //
      // Inline parsing functions
      //
      // Parser path:
      //  - parseSequence
      //    - parseRepeat
      //      - parseRange

      /**
       * Parse sequence
       *
       * @param {String} val
       * @return {Array}
       * @private
       */
      function parseSequence(val) {
        var stack = [];

        function handleResult(result) {
          var max = stack.length > 0 ? Math.max.apply(Math, stack) : -1;

          if (result instanceof Array) {
            // Make sequence linear
            for (var i = 0, c = result.length; i < c; i++) {
              var value = result[i];

              // Check constraints
              if (value < constraints[0] || value > constraints[1]) {
                throw new Error('Constraint error, got value ' + value + ' expected range ' + constraints[0] + '-' + constraints[1]);
              }

              if (value > max) {
                stack.push(value);
              }

              max = Math.max.apply(Math, stack);
            }
          } else {
            // Scalar value
            result = +result;

            // Check constraints
            if (result < constraints[0] || result > constraints[1]) {
              throw new Error('Constraint error, got value ' + result + ' expected range ' + constraints[0] + '-' + constraints[1]);
            }

            if (field == 'dayOfWeek') {
              result = result % 7;
            }

            if (result > max) {
              stack.push(result);
            }
          }
        }

        var atoms = val.split(',');
        if (atoms.length > 1) {
          for (var i = 0, c = atoms.length; i < c; i++) {
            handleResult(parseRepeat(atoms[i]));
          }
        } else {
          handleResult(parseRepeat(val));
        }

        return stack;
      }

      /**
       * Parse repetition interval
       *
       * @param {String} val
       * @return {Array}
       */
      function parseRepeat(val) {
        var repeatInterval = 1;
        var atoms = val.split('/');

        if (atoms.length > 1) {
          return parseRange(atoms[0], atoms[atoms.length - 1]);
        }

        return parseRange(val, repeatInterval);
      }

      /**
       * Parse range
       *
       * @param {String} val
       * @param {Number} repeatInterval Repetition interval
       * @return {Array}
       * @private
       */
      function parseRange(val, repeatInterval) {
        var stack = [];
        var atoms = val.split('-');

        if (atoms.length > 1) {
          // Invalid range, return value
          if (atoms.length < 2 || !atoms[0].length) {
            return +val;
          }

          // Validate range
          var min = +atoms[0];
          var max = +atoms[1];

          if (safeIsNaN(min) || safeIsNaN(max) || min < constraints[0] || max > constraints[1]) {
            throw new Error('Constraint error, got range ' + min + '-' + max + ' expected range ' + constraints[0] + '-' + constraints[1]);
          } else if (min >= max) {
            throw new Error('Invalid range: ' + val);
          }

          // Create range
          var repeatIndex = +repeatInterval;

          if (safeIsNaN(repeatIndex) || repeatIndex <= 0) {
            throw new Error('Constraint error, cannot repeat at every ' + repeatIndex + ' time.');
          }

          for (var index = min, count = max; index <= count; index++) {
            if (repeatIndex > 0 && repeatIndex % repeatInterval === 0) {
              repeatIndex = 1;
              stack.push(index);
            } else {
              repeatIndex++;
            }
          }

          return stack;
        }

        return +val;
      }

      return parseSequence(value);
    }
  }, {
    key: '_parse',
    value: function _parse(str) {
      var self = this;
      var parts = str.split(' ');

      // make sure we have all the fields of the crontab
      if (parts.length < this.fieldMap.length) {
        throw new Error("Invalid crontab");
      }

      this.fieldMap.forEach(function (field, idx) {
        var value = parts[idx] || self.fieldDefaults[idx];
        var parsed = self._parseField(field, value, self.constraints[idx]);

        // create this.minute, this.hour, ...etc
        self.fields[field] = new _field.Field(this.getName(idx), value, idx, parsed);
      }, this);
    }
  }, {
    key: '_doFieldsMatchTypes',
    value: function _doFieldsMatchTypes(arr, onlyFields) {
      /**
        arr is an array of field types (between 1 and 5 items), ie ['every_step', 'range']
        if an item in arr is an array, we match as an 'OR' statement,
        ie ['every', ['every', 'every_step']] will match if minute=every AND (hour=every OR hour=every_step)
        You can also use 'any' as an item in the array, but this is only useful if you ALSO specify another field
      */
      var self = this;
      onlyFields = onlyFields || [];
      var arr_idx = 0;
      var matches = true;
      this.fieldMap.forEach(function (f, i) {
        if (onlyFields.indexOf(i) !== -1) {
          // for each field, we need to loop through the fieldType array
          self.fields[f].fieldType.forEach(function (fieldType) {

            var search = arr[arr_idx] || 'every';
            if (Array.isArray(search)) {
              var or_match = false;
              search.forEach(function (s_item) {
                if (fieldType === s_item) {
                  or_match = true;
                }
              });
              matches = or_match;
            } else {
              if (search !== 'any' && fieldType !== search) {
                matches = false;
              }
            }
          });
          arr_idx++;
        }
      });
      return matches;
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return {
        val: this.val,
        fields: this.fields,
        phrase: this.phrase
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      var self = this;
      var str = '';
      var time = '';
      var date = '';
      var dow = '';

      function applyTemplate(templates, defaultTemplate, includeFields) {
        var str = '';
        var values = [];
        includeFields = includeFields || [];
        var template = self[templates].find(function (tpl, idx) {
          return self._doFieldsMatchTypes(tpl.condition, includeFields);
        });

        var template_str = template && (template.format !== undefined || template.format !== null) ? template.format : self[defaultTemplate];

        // using handlebars - WOW so easy!
        var hb = _handlebars2.default.compile(template_str);
        str = hb(self.fields);
        return str;
      }

      time = applyTemplate('cdlTimeTemplates', 'cdlTimeDefaultTemplate', [0, 1]);
      date = applyTemplate('cdlDateTemplates', 'cdlDateDefaultTemplate', [2, 3]);
      dow = applyTemplate('cdlDayOfWeekTemplates', 'cdlDayOfWeekDefaultTemplate', [4]);
      var date_sep = time !== '' && date !== '' ? ' ' : '';
      var dow_sep = '';
      if (time !== '' && dow && dow !== '') dow_sep = ' ';
      if (date !== '' && dow && dow !== '') dow_sep = ', plus ';
      str = time + date_sep + date + dow_sep + dow;

      return (0, _utils.titleCase)(str);
    }
  }]);

  return Corny;
}(_config.Config);

// register Handlebars helpers


_handlebars2.default.registerHelper('join', function (context, options) {
  if (!options) {
    throw new Error('Must pass iterator to #join');
  }

  var arr = [];

  context.forEach(function (item) {
    arr.push(options.fn(item));
  });

  return (0, _utils.formatArray)(arr);
});

_handlebars2.default.registerHelper('isEvery', function (field, options) {
  if (field.fieldType.length === 1 && field.fieldType[0] === 'every') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

_handlebars2.default.registerHelper('pluralize', function (field, component) {
  var phrases = field.phrases;
  var plural = true;
  if (field.components.length === 1) {
    if (field.components[0][component] === 1 || field.components[0][component] === '1') {
      plural = false;
    }
  }
  return !plural ? phrases[0] : phrases[1];
});

_handlebars2.default.registerHelper('zeroPad', function (num) {
  num = num + ''; // convert to string
  return num.length === 1 ? '0' + num : num;
});

_handlebars2.default.registerHelper('numSuffix', function (num) {
  num = num + ''; // convert to string
  var suffix = '';
  var lastDigit = Number(num.charAt(num.length - 1));
  var suffixes = ['', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  var endsWithTh = ['11', '12', '13', '14', '15', '16', '17', '18', '19'];
  var foundInEndsWith = endsWithTh.find(function (suffix) {
    return num.endsWith(suffix);
  });

  if (foundInEndsWith || lastDigit === 0 && num.length > 1) {
    suffix = 'th';
  } else {
    suffix = suffixes[lastDigit];
  }
  return num + suffix;
});

_handlebars2.default.registerHelper('dowToString', function (num) {
  var str = '';
  var config = new _config.Config();
  var aliases = config.aliases.dayOfWeek;
  for (var a in aliases) {
    var val = aliases[a] + '';
    if (val === num || a.toLowerCase() === num.toLowerCase()) {
      str = a;
      break;
    }
  }
  return (0, _utils.titleCase)(str);
});

_handlebars2.default.registerHelper('monthToString', function (num) {
  var str = '';
  var config = new _config.Config();
  var aliases = config.aliases.month;
  for (var a in aliases) {
    var val = aliases[a] + '';
    if (val === num || a.toLowerCase() === num.toLowerCase()) {
      str = a;
      break;
    }
  }
  return (0, _utils.titleCase)(str);
});

_handlebars2.default.registerHelper('expandTime', function (min_field, hour_field) {
  var arr = [];
  var mins = min_field.expanded;
  var hours = hour_field.expanded;
  hours.forEach(function eachHour(hour) {
    mins.forEach(function eachMinute(min) {
      min = _handlebars2.default.helpers.zeroPad(min);
      arr.push(hour + ':' + min);
    });
  });
  return (0, _utils.formatArray)(arr);
});

function logger() {
  if (debug) console.log.apply(this, arguments);
}

module.exports = Corny;