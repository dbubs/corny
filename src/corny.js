"use strict";

import util from 'util';
import Handlebars from 'handlebars';

import {Config} from './config';
import {Field} from './field';
import {createFrame, isArray, isFunction, formatArray, titleCase, isNumeric} from './utils';

const format = util.format;
const debug = false;

class Corny extends Config {
  constructor(val) {
    super();
    this.val = val.toUpperCase();

    // populated in this._parse()
    this.fields = {};

    this._parse(val);
    this.phrase = this.toString();
  }

  // borrowed and slightly modified from https://github.com/harrisiirak/cron-parser
  _parseField(field, value, constraints) {

    const self = this;
    const safeIsNaN = Number.isNaN;

    // Replace aliases
    switch (field) {
      case 'month':
      case 'dayOfWeek':
        var aliases = self.aliases[field];

        value = value.replace(/[a-z]{1,3}/gi, function(match) {
          match = match.toLowerCase();

          if (typeof aliases[match] !== undefined) {
            return aliases[match];
          } else {
            throw new Error('Cannot resolve alias "' + match + '"')
          }
        });
        break;
    }

    // Check for valid characters.
    if (!(/^[\d|/|*|\-|,]+$/.test(value))) {
      throw new Error('Invalid characters, got value: ' + value)
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
    function parseSequence (val) {
      var stack = [];

      function handleResult (result) {
        var max = stack.length > 0 ? Math.max.apply(Math, stack) : -1;

        if (result instanceof Array) { // Make sequence linear
          for (var i = 0, c = result.length; i < c; i++) {
            var value = result[i];

            // Check constraints
            if (value < constraints[0] || value > constraints[1]) {
              throw new Error(
                  'Constraint error, got value ' + value + ' expected range ' +
                  constraints[0] + '-' + constraints[1]
              );
            }

            if (value > max) {
              stack.push(value);
            }

            max = Math.max.apply(Math, stack);
          }
        } else { // Scalar value
          result = +result;

          // Check constraints
          if (result < constraints[0] || result > constraints[1]) {
            throw new Error(
              'Constraint error, got value ' + result + ' expected range ' +
              constraints[0] + '-' + constraints[1]
            );
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
    function parseRepeat (val) {
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
    function parseRange (val, repeatInterval) {
      var stack = [];
      var atoms = val.split('-');

      if (atoms.length > 1 ) {
        // Invalid range, return value
        if (atoms.length < 2 || !atoms[0].length) {
          return +val;
        }

        // Validate range
        var min = +atoms[0];
        var max = +atoms[1];

        if (safeIsNaN(min) || safeIsNaN(max) ||
            min < constraints[0] || max > constraints[1]) {
          throw new Error(
            'Constraint error, got range ' +
            min + '-' + max +
            ' expected range ' +
            constraints[0] + '-' + constraints[1]
          );
        } else if (min >= max) {
          throw new Error('Invalid range: ' + val);
        }

        // Create range
        var repeatIndex = +repeatInterval;

        if (safeIsNaN(repeatIndex) || repeatIndex <= 0) {
          throw new Error('Constraint error, cannot repeat at every ' + repeatIndex + ' time.');
        }

        for (var index = min, count = max; index <= count; index++) {
          if (repeatIndex > 0 && (repeatIndex % repeatInterval) === 0) {
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

  _parse(str) {
    const self = this;
    const parts = str.split(' ');

    // make sure we have all the fields of the crontab
    if (parts.length < this.fieldMap.length) {
      throw new Error("Invalid crontab");
    }

    this.fieldMap.forEach(function(field, idx) {
      let value = parts[idx] || self.fieldDefaults[idx];
      let parsed = self._parseField(field, value, self.constraints[idx]);

      // create this.minute, this.hour, ...etc
      self.fields[field] = new Field(this.getName(idx), value, idx, parsed);
    }, this);
  }

  _doFieldsMatchTypes(arr, onlyFields) {
    /**
      arr is an array of field types (between 1 and 5 items), ie ['every_step', 'range']
      if an item in arr is an array, we match as an 'OR' statement,
      ie ['every', ['every', 'every_step']] will match if minute=every AND (hour=every OR hour=every_step)
      You can also use 'any' as an item in the array, but this is only useful if you ALSO specify another field
    */
    const self = this;
    onlyFields = onlyFields || [];
    let arr_idx = 0;
    var matches = true;
    this.fieldMap.forEach(function(f, i) {
      if (onlyFields.indexOf(i) !== -1) {
        // for each field, we need to loop through the fieldType array
        self.fields[f].fieldType.forEach(function(fieldType) {

          let search = arr[arr_idx] || 'every';
          if (Array.isArray(search)) {
            let or_match = false;
            search.forEach(function(s_item) {
              if (fieldType === s_item ) {
                or_match = true;
              }
            });
            matches = or_match;
          } else {
            if (search !== 'any' && fieldType !== search ) {
              matches = false;
            }
          }
        }); 
        arr_idx++;
      }
    });
    return matches;
  }

  toObject() {
    return {
      val: this.val,
      fields: this.fields,
      phrase: this.phrase
    };
  }

  toString() {
    const self = this;
    let str = '';
    let time = '';
    let date = '';
    let dow = '';

    function applyTemplate(templates, defaultTemplate, includeFields) {
      let str = '';
      let values = [];
      includeFields = includeFields || [];
      let template = self[templates].find(function (tpl, idx) {
        return self._doFieldsMatchTypes(tpl.condition, includeFields);
      });

      const template_str = (template && (template.format !== undefined || template.format !== null)) ? template.format : self[defaultTemplate];

      // using handlebars - WOW so easy!
      const hb = Handlebars.compile(template_str);
      str = hb(self.fields);
      return str;
    }

    time = applyTemplate('cdlTimeTemplates', 'cdlTimeDefaultTemplate', [0,1]);
    date = applyTemplate('cdlDateTemplates', 'cdlDateDefaultTemplate', [2,3]);
    dow = applyTemplate('cdlDayOfWeekTemplates', 'cdlDayOfWeekDefaultTemplate', [4]);
    let date_sep = (time !== '' && date !== '') ? ' ' : '';
    let dow_sep = '';
    if (time !== '' && dow && dow !== '') dow_sep = ' ';
    if (date !== '' && dow && dow !== '') dow_sep = ', plus ';
    str = time + date_sep + date + dow_sep + dow;

    return titleCase(str);
  }
}

// register Handlebars helpers
Handlebars.registerHelper('join', function(context, options) {
  if (!options) {
    throw new Error('Must pass iterator to #join');
  }

  let arr = [];

  context.forEach(function (item) {
    arr.push(options.fn(item));
  });

  return formatArray(arr);
});

Handlebars.registerHelper('isEvery', function(field, options) {
  if (field.fieldType.length === 1 && field.fieldType[0] === 'every') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('pluralize', function(field, component) {
  const phrases = field.phrases;
  let plural = true;
  if (field.components.length === 1) {
    if (field.components[0][component] === 1 || field.components[0][component] === '1') {
      plural = false;
    }
  }
  return (!plural) ? phrases[0] : phrases[1];
});

Handlebars.registerHelper('zeroPad', function(num) {
  num = num+''; // convert to string
  return (num.length === 1) ? '0'+num : num;
});

Handlebars.registerHelper('numSuffix', function(num) {
  num = num+''; // convert to string
  let suffix = '';
  const lastDigit = Number(num.charAt(num.length-1));
  const suffixes = ['', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  const endsWithTh = ['11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const foundInEndsWith = endsWithTh.find(function(suffix) {
    return num.endsWith(suffix);
  });

  if (foundInEndsWith || (lastDigit === 0 && num.length > 1)) {
    suffix = 'th';
  } else  {
    suffix = suffixes[lastDigit];
  }
  return num + suffix;
});

Handlebars.registerHelper('dowToString', function(num) {
  let str = '';
  const config = new Config();
  const aliases = config.aliases.dayOfWeek;
  for (let a in aliases) {
    const val = aliases[a]+'';
    if (val === num || a.toLowerCase() === num.toLowerCase()) {
      str = a;
      break;
    }
  }
  return titleCase(str);
});

Handlebars.registerHelper('monthToString', function(num) {
  let str = '';
  const config = new Config();
  const aliases = config.aliases.month;
  for (let a in aliases) {
    const val = aliases[a]+'';
    if (val === num || a.toLowerCase() === num.toLowerCase()) {
      str = a;
      break;
    }
  }
  return titleCase(str);
});

Handlebars.registerHelper('expandTime', function(min_field, hour_field) {
  let arr = [];
  const mins = min_field.expanded;
  const hours = hour_field.expanded;
  hours.forEach(function eachHour(hour) {
    mins.forEach(function eachMinute(min) {
      min = Handlebars.helpers.zeroPad(min);
      arr.push(hour+':'+min);
    });
  });
  return formatArray(arr);
});


function logger () {
  if (debug) console.log.apply(this, arguments);
}

module.exports = Corny;
