"use strict";

import Handlebars from 'handlebars';

export class Templates {
  constructor() {
    // time partials
    Handlebars.registerPartial('minute_s', '{{minute.phrases.[0]}}');
    Handlebars.registerPartial('rangeMinute', '{{#join minute.components}}{{zeroPad range.from}}-{{zeroPad range.to}}{{/join}}');
    Handlebars.registerPartial('scalarMinute', '{{#join minute.components}}{{zeroPad scalar}}{{/join}}');
    Handlebars.registerPartial('everyStepMinute', 'every {{#join minute.components}}{{step_interval}}{{/join}} {{pluralize minute "step_interval"}}');
    Handlebars.registerPartial('rangeStepMinute', 'every {{#join minute.components}}{{step_interval}}{{/join}} {{pluralize minute "step_interval"}} between {{> rangeMinute}} minutes');
    Handlebars.registerPartial('rangeHour', '{{#join hour.components}}{{range.from}}:00-{{range.to}}:00{{/join}}');
    Handlebars.registerPartial('scalarHour', '{{#join hour.components}}{{scalar}}:00{{/join}}');
    Handlebars.registerPartial('everyStepHour', 'every {{#join hour.components}}{{step_interval}}{{/join}} hours');
    Handlebars.registerPartial('rangeStepHour', 'every {{#join hour.components}}{{step_interval}}{{/join}} hours between {{#join hour.components}}{{range.from}}:00-{{range.to}}:00{{/join}}');

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
      'rangeStepMinute__rangeStepHour': '{{> rangeStepMinute}} of {{> rangeStepHour}}',
    };

    // date partials
    Handlebars.registerPartial('day_s', '{{dayOfMonth.phrases.[0]}}');
    Handlebars.registerPartial('rangeDay', '{{#join dayOfMonth.components}}{{numSuffix range.from}} & {{numSuffix range.to}}{{/join}}');
    Handlebars.registerPartial('scalarDay', '{{#join dayOfMonth.components}}{{numSuffix scalar}}{{/join}}');
    Handlebars.registerPartial('everyStepDay', 'every {{#join dayOfMonth.components}}{{step_interval}}{{/join}} {{pluralize dayOfMonth "step_interval"}}');
    Handlebars.registerPartial('rangeStepDay', 'every {{#join dayOfMonth.components}}{{step_interval}}{{/join}} {{pluralize dayOfMonth "step_interval"}} between the {{> rangeDay}}');
    Handlebars.registerPartial('rangeMonth', '{{#join month.components}}{{monthToString range.from}}-{{monthToString range.to}}{{/join}}');
    Handlebars.registerPartial('scalarMonth', '{{#join month.components}}{{monthToString scalar}}{{/join}}');
    Handlebars.registerPartial('everyStepMonth', 'every {{#join month.components}}{{step_interval}}{{/join}} months');
    Handlebars.registerPartial('rangeStepMonth', 'every {{#join month.components}}{{step_interval}}{{/join}} months between {{#join month.components}}{{monthToString range.from}}-{{monthToString range.to}}{{/join}}');

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
      'rangeStepDay_rangeStepMonth': 'on {{> rangeStepDay}} of {{> rangeStepMonth}}',

    };

    // day of week partials
    Handlebars.registerPartial('rangeDayOfWeek', '{{#join dayOfWeek.components}}{{dowToString range.from}}-{{dowToString range.to}}{{/join}}');
    Handlebars.registerPartial('scalarDayOfWeek', '{{#join dayOfWeek.components}}{{dowToString scalar}}{{/join}}');
    Handlebars.registerPartial('everyStepDayOfWeek', 'every {{#join dayOfWeek.components}}{{step_interval}}{{/join}} days of the week');
    Handlebars.registerPartial('rangeStepDayOfWeek', 'every {{#join dayOfWeek.components}}{{step_interval}}{{/join}} days of the week between {{#join dayOfWeek.components}}{{dowToString range.from}}-{{dowToString range.to}}{{/join}}');

    this.dow = {
      'default': 'on {{#join dayOfWeek.expanded}}{{dowToString this}}{{/join}}',

      'everyDayOfWeek': '',
      'rangeDayOfWeek': 'on {{> rangeDayOfWeek}}',
      'scalarDayOfWeek': 'on {{> scalarDayOfWeek}}',
      'everyStepDayOfWeek': 'on {{> everyStepDayOfWeek}}',
      'rangeStepDayOfWeek': 'on {{> rangeStepDayOfWeek}}',
    };
  };
}
