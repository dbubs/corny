  /*
   * corny - http://corntab.com
   * Version - 0.0.3
   * Licensed under the ISC license - https://opensource.org/licenses/ISC
   * 
   * Copyright (c) 2016 David Knell <david@corntab.com>
  */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function Component(props) {
  _classCallCheck(this, Component);

  props = props || {};
  this.every = props.every || null;
  this.range = props.range || null;
  this.step_interval = props.step_interval || null;
  this.scalar = props.scalar || null;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templates = require('./templates');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = function () {
  function Config(fieldId) {
    _classCallCheck(this, Config);

    var templates = new _templates.Templates();

    // this is used to identify a field type by validating a field's components against these values
    this.fieldTypes = {
      every: { notNull: ['every'] },
      range: { notNull: ['range'] },
      scalar: { notNull: ['scalar'] },
      every_step: { notNull: ['every', 'step_interval'] },
      range_step: { notNull: ['range', 'step_interval'] }
    };

    this.fieldMap = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];
    this.fieldDefaults = ['*', '*', '*', '*', '*'];

    this.constraints = [[0, 59], // Minute
    [0, 23], // Hour
    [1, 31], // Day of month
    [1, 12], // Month
    [0, 7] // Day of week
    ];

    this.aliases = {
      month: {
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12
      },

      dayOfWeek: {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6
      }
    };

    // conditional time templates (first 2 fields)
    this.cdlTimeTemplates = [
    // every minute
    {
      condition: ['every'],
      format: templates.time['everyMinute']
    }, {
      condition: ['every', 'range'],
      format: templates.time['everyMinute_rangeHour']
    }, {
      condition: ['every', 'scalar'],
      format: templates.time['everyMinute_scalarHour']
    }, {
      condition: ['every', 'every_step'],
      format: templates.time['everyMinute_everyStepHour']
    }, {
      condition: ['every', 'range_step'],
      format: templates.time['everyMinute_rangeStepHour']
    },
    // range minute
    {
      condition: ['range'],
      format: templates.time['rangeMinute']
    }, {
      condition: ['range', 'range'],
      format: templates.time['rangeMinute_rangeHour']
    }, {
      condition: ['range', 'scalar'],
      format: templates.time['rangeMinute_scalarHour']
    }, {
      condition: ['range', 'every_step'],
      format: templates.time['rangeMinute_everyStepHour']
    }, {
      condition: ['range', 'range_step'],
      format: templates.time['rangeMinute_rangeStepHour']
    },
    // scalar minute
    {
      condition: ['scalar'],
      format: templates.time['scalarMinute']
    }, {
      condition: ['scalar', 'range'],
      format: templates.time['scalarMinute__rangeHour']
    }, {
      condition: ['scalar', 'scalar'],
      // format: templates.time['default']
      format: templates.time['scalarMinute__scalarHour']
    }, {
      condition: ['scalar', 'every_step'],
      format: templates.time['scalarMinute__everyStepHour']
    }, {
      condition: ['scalar', 'range_step'],
      format: templates.time['scalarMinute__rangeStepHour']
    },
    // every step minute
    {
      condition: ['every_step'],
      format: templates.time['everyStepMinute']
    }, {
      condition: ['every_step', 'range'],
      format: templates.time['everyStepMinute_rangeHour']
    }, {
      condition: ['every_step', 'scalar'],
      format: templates.time['everyStepMinute_scalarHour']
    }, {
      condition: ['every_step', 'every_step'],
      format: templates.time['everyStepMinute__everyStepHour']
    }, {
      condition: ['every_step', 'range_step'],
      format: templates.time['everyStepMinute__rangeStepHour']
    },
    // range step minute
    {
      condition: ['range_step'],
      format: templates.time['rangeStepMinute']
    }, {
      condition: ['range_step', 'range'],
      format: templates.time['rangeStepMinute__rangeHour']
    }, {
      condition: ['range_step', 'scalar'],
      format: templates.time['rangeStepMinute__scalarHour']
    }, {
      condition: ['range_step', 'every_step'],
      format: templates.time['rangeStepMinute__everyStepHour']
    }, {
      condition: ['range_step', 'range_step'],
      format: templates.time['rangeStepMinute__rangeStepHour']
    }];

    // conditional date templates (3rd and 4th fields)
    this.cdlDateTemplates = [
    // every day
    {
      condition: ['every'],
      format: templates.date['everyDay']
    }, {
      condition: ['every', 'range'],
      format: templates.date['everyDay_rangeMonth']
    }, {
      condition: ['every', 'scalar'],
      format: templates.date['everyDay_scalarMonth']
    }, {
      condition: ['every', 'every_step'],
      format: templates.date['everyDay_everyStepMonth']
    }, {
      condition: ['every', 'range_step'],
      format: templates.date['everyDay_rangeStepMonth']
    },
    // range day
    {
      condition: ['range'],
      format: templates.date['rangeDay']
    }, {
      condition: ['range', 'range'],
      format: templates.date['rangeDay_rangeMonth']
    }, {
      condition: ['range', 'scalar'],
      format: templates.date['rangeDay_scalarMonth']
    }, {
      condition: ['range', 'every_step'],
      format: templates.date['rangeDay_everyStepMonth']
    }, {
      condition: ['range', 'range_step'],
      format: templates.date['rangeDay_rangeStepMonth']
    },
    // scalar day
    {
      condition: ['scalar'],
      format: templates.date['scalarDay']
    }, {
      condition: ['scalar', 'range'],
      format: templates.date['scalarDay_rangeMonth']
    }, {
      condition: ['scalar', 'scalar'],
      format: templates.date['scalarDay_scalarMonth']
    }, {
      condition: ['scalar', 'every_step'],
      format: templates.date['scalarDay_everyStepMonth']
    }, {
      condition: ['scalar', 'range_step'],
      format: templates.date['scalarDay_rangeStepMonth']
    },
    // every step day
    {
      condition: ['every_step'],
      format: templates.date['everyStepDay']
    }, {
      condition: ['every_step', 'range'],
      format: templates.date['everyStepDay_rangeMonth']
    }, {
      condition: ['every_step', 'scalar'],
      format: templates.date['everyStepDay_scalarMonth']
    }, {
      condition: ['every_step', 'every_step'],
      format: templates.date['everyStepDay_everyStepMonth']
    }, {
      condition: ['every_step', 'range_step'],
      format: templates.date['everyStepDay_rangeStepMonth']
    },
    // range step day
    {
      condition: ['range_step'],
      format: templates.date['rangeStepDay']
    }, {
      condition: ['range_step', 'range'],
      format: templates.date['rangeStepDay_rangeMonth']
    }, {
      condition: ['range_step', 'scalar'],
      format: templates.date['rangeStepDay_scalarMonth']
    }, {
      condition: ['range_step', 'every_step'],
      format: templates.date['rangeStepDay_everyStepMonth']
    }, {
      condition: ['range_step', 'range_step'],
      format: templates.date['rangeStepDay_rangeStepMonth']
    }];

    // conditional day of week templates (5th field)
    this.cdlDayOfWeekTemplates = [
    // every day of week
    {
      condition: ['every'],
      format: templates.dow['everyDayOfWeek']
    },
    // range day of week
    {
      condition: ['range'],
      format: templates.dow['rangeDayOfWeek']
    },
    // scalar day of week
    {
      condition: ['scalar'],
      format: templates.dow['scalarDayOfWeek']
    },
    // every step day of week
    {
      condition: ['every_step'],
      format: templates.dow['everyStepDayOfWeek']
    },
    // range step day of week
    {
      condition: ['range_step'],
      format: templates.dow['rangeStepDayOfWeek']
    }];

    this.cdlTimeDefaultTemplate = templates.time['default'];
    this.cdlDateDefaultTemplate = templates.date['default'];
    this.cdlDayOfWeekDefaultTemplate = templates.dow['default'];

    var phrases = [['minute', 'minutes'], ['hour', 'hours'], ['day', 'days'], ['month', 'months'], ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Weekdays', 'Weekends']];

    this.phrases = phrases[fieldId];
  }

  _createClass(Config, [{
    key: 'getIndex',
    value: function getIndex(name) {
      return this.fieldMap.findIndex(function (val) {
        return name === val;
      });
    }
  }, {
    key: 'getName',
    value: function getName(idx) {
      return this.fieldMap[idx];
    }
  }]);

  return Config;
}();
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

    _this.val = val;

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

      this.fieldMap.forEach(function (field, idx) {
        var value = parts[idx] || self.fieldDefaults[i];
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
  var lastDigit = Number(num.charAt(num.length - 1));
  var suffixes = ['', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  var suffix = suffixes[lastDigit];
  if (lastDigit === 0 && num.length > 1 || num === '11') {
    suffix = 'th';
  }
  return num + suffix;
});

_handlebars2.default.registerHelper('dowToString', function (num) {
  var str = '';
  var config = new _config.Config();
  var aliases = config.aliases.dayOfWeek;
  for (var a in aliases) {
    var val = aliases[a] + '';
    if (val === num) {
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
    if (val === num) {
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _component = require('./component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = exports.Field = function () {
  function Field(name, val, fieldId, expanded) {
    _classCallCheck(this, Field);

    this.name = name;
    this.val = val;
    this.fieldId = fieldId;
    this.expanded = expanded || [];
    this.components = this.getComponents();
    this.fieldType = this.getFieldType();
  }

  _createClass(Field, [{
    key: 'getFieldType',
    value: function getFieldType() {
      // return Array
      var self = this;
      var conf = new _config.Config(self.fieldId);
      // add phrases to the current field
      self.phrases = conf.phrases;
      var list = [];
      if (this.components.length > 1) {
        this.components.forEach(function (comp) {
          list.push(resolve(comp, false));
        });
        return list;
      } else {
        return [resolve(this.components[0], false)];
      }

      function resolve(comp, isList) {
        isList = isList ? true : false;
        var fieldType = void 0;
        // look through the fieldTypes and match the validation parameter
        for (var ft in conf.fieldTypes) {
          var ft_obj = conf.fieldTypes[ft];
          // set ft_isList to false if undefined
          var ft_isList = ft_obj.isList ? ft_obj.isList : false;
          if (ft_isList === isList) {
            var valid = true;
            // loop through components
            for (var c in comp) {
              if (comp[c] !== null) {
                var idx = ft_obj.notNull.indexOf(c);
                var found = idx > -1;
                if (!found) {
                  valid = false;
                }
              }
            }
            if (valid) {
              fieldType = ft;
              break;
            }
          }
        }
        return fieldType;
      }
    }
  }, {
    key: 'getComponents',
    value: function getComponents() {
      var self = this;
      var components = [];

      function parseValue(val) {

        function handleResult(res) {
          // create string phrase
          return res;
        }

        return handleResult(getList(val));
      }

      function getList(val) {
        var list_parts = val.split(',');
        var list = [];
        if (list_parts.length > 1) {
          list_parts.forEach(function (part, i) {
            list.push(getStep(part));
          });
        } else {
          // single value
          list.push(getStep(val));
        }
        return list;
      }

      function getStep(val) {
        var step_parts = val.split('/');
        if (step_parts.length > 1) {
          return getRange(step_parts[0], step_parts[1]);
        } else {
          // not a step (ie */2)
          return getRange(val);
        }
      }

      function getRange(val, step_interval) {
        var component = new _component.Component();
        var range_parts = val.split('-');
        // logger("range_parts", range_parts);
        if (range_parts.length > 1) {
          component.range = { from: range_parts[0], to: range_parts[1] };
        } else {
          // not a range (ie * or 6)
          if (val === "*") {
            component.every = val;
          } else {
            component.scalar = val;
          }
        }
        component.step_interval = step_interval || null;
        return component;
      }

      return parseValue(this.val);
    }
  }]);

  return Field;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Templates = undefined;

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Templates = exports.Templates = function Templates() {
  _classCallCheck(this, Templates);

  // time partials
  _handlebars2.default.registerPartial('minute_s', '{{minute.phrases.[0]}}');
  _handlebars2.default.registerPartial('rangeMinute', '{{#join minute.components}}{{zeroPad range.from}}-{{zeroPad range.to}}{{/join}}');
  _handlebars2.default.registerPartial('scalarMinute', '{{#join minute.components}}{{zeroPad scalar}}{{/join}}');
  _handlebars2.default.registerPartial('everyStepMinute', 'every {{#join minute.components}}{{step_interval}}{{/join}} {{pluralize minute "step_interval"}}');
  _handlebars2.default.registerPartial('rangeStepMinute', 'every {{#join minute.components}}{{step_interval}}{{/join}} {{pluralize minute "step_interval"}} between {{> rangeMinute}} minutes');
  _handlebars2.default.registerPartial('rangeHour', '{{#join hour.components}}{{range.from}}:00-{{range.to}}:00{{/join}}');
  _handlebars2.default.registerPartial('scalarHour', '{{#join hour.components}}{{scalar}}:00{{/join}}');
  _handlebars2.default.registerPartial('everyStepHour', 'every {{#join hour.components}}{{step_interval}}{{/join}} hours');
  _handlebars2.default.registerPartial('rangeStepHour', 'every {{#join hour.components}}{{step_interval}}{{/join}} hours between {{#join hour.components}}{{range.from}}:00-{{range.to}}:00{{/join}}');

  this.time = {
    'default': 'at {{expandTime minute hour}}',

    'everyMinute': 'every {{> minute_s}}',
    'everyMinute_rangeHour': 'every {{> minute_s}} between the hours of {{> rangeHour}}',
    'everyMinute_scalarHour': 'every {{> minute_s}} at {{> scalarHour}}',
    'everyMinute_everyStepHour': 'every {{> minute_s}} at {{> everyStepHour}}',
    'everyMinute_rangeStepHour': 'every {{> minute_s}} at {{> rangeStepHour}}',

    'rangeMinute': 'at each {{> minute_s}} between {{> rangeMinute}} of every hour',
    'rangeMinute_rangeHour': 'at each {{> minute_s}} between {{> rangeMinute}} of the hours between {{> rangeHour}}',
    'rangeMinute_scalarHour': 'at each {{> minute_s}} between {{> rangeMinute}} of the hours {{> scalarHour}}',
    'rangeMinute_everyStepHour': 'at each {{> minute_s}} between {{> rangeMinute}} of {{> everyStepHour}}',
    'rangeMinute_rangeStepHour': 'at each {{> minute_s}} between {{> rangeMinute}} of {{> rangeStepHour}}',

    'scalarMinute': 'at {{> scalarMinute}} {{pluralize minute "scalar"}} past every hour',
    'scalarMinute__rangeHour': 'at {{> scalarMinute}} {{pluralize minute "scalar"}} past the hours between {{> rangeHour}}',
    'scalarMinute__scalarHour': 'at {{> scalarMinute}} {{pluralize minute "scalar"}} past {{> scalarHour}}',
    'scalarMinute__everyStepHour': 'at {{> scalarMinute}} {{pluralize minute "scalar"}} of {{> everyStepHour}}',
    'scalarMinute__rangeStepHour': 'at {{> scalarMinute}} {{pluralize minute "scalar"}} of {{> rangeStepHour}}',

    'everyStepMinute': '{{> everyStepMinute}}',
    'everyStepMinute_rangeHour': '{{> everyStepMinute}} between the hours of {{> rangeHour}}',
    'everyStepMinute_scalarHour': '{{> everyStepMinute}} past {{> scalarHour}}',
    'everyStepMinute__everyStepHour': '{{> everyStepMinute}} of {{> everyStepHour}}',
    'everyStepMinute__rangeStepHour': '{{> everyStepMinute}} of {{> rangeStepHour}}',

    'rangeStepMinute': '{{> rangeStepMinute}} past every hour',
    'rangeStepMinute__rangeHour': '{{> rangeStepMinute}} between the hours of {{> rangeHour}}',
    'rangeStepMinute__scalarHour': '{{> rangeStepMinute}} past {{> scalarHour}}',
    'rangeStepMinute__everyStepHour': '{{> rangeStepMinute}} of {{> everyStepHour}}',
    'rangeStepMinute__rangeStepHour': '{{> rangeStepMinute}} of {{> rangeStepHour}}'
  };

  // date partials
  _handlebars2.default.registerPartial('day_s', '{{dayOfMonth.phrases.[0]}}');
  _handlebars2.default.registerPartial('rangeDay', '{{#join dayOfMonth.components}}{{numSuffix range.from}} & {{numSuffix range.to}}{{/join}}');
  _handlebars2.default.registerPartial('scalarDay', '{{#join dayOfMonth.components}}{{numSuffix scalar}}{{/join}}');
  _handlebars2.default.registerPartial('everyStepDay', 'every {{#join dayOfMonth.components}}{{step_interval}}{{/join}} {{pluralize dayOfMonth "step_interval"}}');
  _handlebars2.default.registerPartial('rangeStepDay', 'every {{#join dayOfMonth.components}}{{step_interval}}{{/join}} {{pluralize dayOfMonth "step_interval"}} between the {{> rangeDay}}');
  _handlebars2.default.registerPartial('rangeMonth', '{{#join month.components}}{{monthToString range.from}}-{{monthToString range.to}}{{/join}}');
  _handlebars2.default.registerPartial('scalarMonth', '{{#join month.components}}{{monthToString scalar}}{{/join}}');
  _handlebars2.default.registerPartial('everyStepMonth', 'every {{#join month.components}}{{step_interval}}{{/join}} months');
  _handlebars2.default.registerPartial('rangeStepMonth', 'every {{#join month.components}}{{step_interval}}{{/join}} months between {{#join month.components}}{{monthToString range.from}}-{{monthToString range.to}}{{/join}}');

  this.date = {
    'default': 'on the {{#join dayOfMonth.expanded}}{{numSuffix this}}{{/join}}{{#isEvery month}} of every month{{else}} in {{#join month.expanded}}{{monthToString this}}{{/join}}{{/isEvery}}',

    'everyDay': '',
    'everyDay_rangeMonth': 'on every {{> day_s}} between {{> rangeMonth}}',
    'everyDay_scalarMonth': 'on every {{> day_s}} in {{> scalarMonth}}',
    'everyDay_everyStepMonth': 'on every {{> day_s}} of {{> everyStepMonth}}',
    'everyDay_rangeStepMonth': 'on every {{> day_s}} of {{> rangeStepMonth}}',

    'rangeDay': 'on each day between the {{> rangeDay}} of every month',
    'rangeDay_rangeMonth': 'on each day between the {{> rangeDay}} of the months between {{> rangeMonth}}',
    'rangeDay_scalarMonth': 'on each day between the {{> rangeDay}} of {{> scalarMonth}}',
    'rangeDay_everyStepMonth': 'on each day between the {{> rangeDay}} of {{> everyStepMonth}}',
    'rangeDay_rangeStepMonth': 'on each day between the {{> rangeDay}} of {{> rangeStepMonth}}',

    'scalarDay': 'on the {{> scalarDay}} day of every month',
    'scalarDay_rangeMonth': 'on the {{> scalarDay}} day of the months between {{> rangeMonth}}',
    'scalarDay_scalarMonth': 'on the {{> scalarDay}} day of {{> scalarMonth}}',
    'scalarDay_everyStepMonth': 'on the {{> scalarDay}} day of {{> everyStepMonth}}',
    'scalarDay_rangeStepMonth': 'on the {{> scalarDay}} day of {{> rangeStepMonth}}',

    'everyStepDay': 'on {{> everyStepDay}} of every month',
    'everyStepDay_rangeMonth': 'on {{> everyStepDay}} of the months between {{> rangeMonth}}',
    'everyStepDay_scalarMonth': 'on {{> everyStepDay}} of {{> scalarMonth}}',
    'everyStepDay_everyStepMonth': 'on {{> everyStepDay}} of {{> everyStepMonth}}',
    'everyStepDay_rangeStepMonth': 'on {{> everyStepDay}} of {{> rangeStepMonth}}',

    'rangeStepDay': 'on {{> rangeStepDay}} of every month',
    'rangeStepDay_rangeMonth': 'on {{> rangeStepDay}} of the months between {{> rangeMonth}}',
    'rangeStepDay_scalarMonth': 'on {{> rangeStepDay}} of {{> scalarMonth}}',
    'rangeStepDay_everyStepMonth': 'on {{> rangeStepDay}} of {{> everyStepMonth}}',
    'rangeStepDay_rangeStepMonth': 'on {{> rangeStepDay}} of {{> rangeStepMonth}}'

  };

  // day of week partials
  _handlebars2.default.registerPartial('rangeDayOfWeek', '{{#join dayOfWeek.components}}{{dowToString range.from}}-{{dowToString range.to}}{{/join}}');
  _handlebars2.default.registerPartial('scalarDayOfWeek', '{{#join dayOfWeek.components}}{{dowToString scalar}}{{/join}}');
  _handlebars2.default.registerPartial('everyStepDayOfWeek', 'every {{#join dayOfWeek.components}}{{step_interval}}{{/join}} days of the week');
  _handlebars2.default.registerPartial('rangeStepDayOfWeek', 'every {{#join dayOfWeek.components}}{{step_interval}}{{/join}} days of the week between {{#join dayOfWeek.components}}{{dowToString range.from}}-{{dowToString range.to}}{{/join}}');

  this.dow = {
    'default': 'on {{#join dayOfWeek.expanded}}{{dowToString this}}{{/join}}',

    'everyDayOfWeek': '',
    'rangeDayOfWeek': 'on {{> rangeDayOfWeek}}',
    'scalarDayOfWeek': 'on {{> scalarDayOfWeek}}',
    'everyStepDayOfWeek': 'on {{> everyStepDayOfWeek}}',
    'rangeStepDayOfWeek': 'on {{> rangeStepDayOfWeek}}'
  };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.indexOf = indexOf;
exports.extend = extend;
exports.createFrame = createFrame;
exports.formatArray = formatArray;
exports.titleCase = titleCase;
// from https://github.com/wycats/handlebars.js/blob/e8ceafa6525a5d41a20aa74dfe24bf99d0bc2fcd/lib/handlebars/utils.js

// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;
var isArray = exports.isArray = Array.isArray || function (value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function formatArray(arr, lastSeparator) {
  lastSeparator = lastSeparator || 'and';
  var outStr = "";
  if (arr.length === 1) {
    outStr = arr[0];
  } else if (arr.length === 2) {
    //joins all with "and" but no commas
    //example: "bob and sam"
    outStr = arr.join(' ' + lastSeparator + ' ');
  } else if (arr.length > 2) {
    //joins all with commas, but last one gets ", and" (oxford comma!)
    //example: "bob, joe, and sam"
    outStr = arr.slice(0, -1).join(', ') + ', ' + lastSeparator + ' ' + arr.slice(-1);
  }
  return outStr;
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}