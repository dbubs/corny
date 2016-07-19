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