import {Templates} from './templates';

export class Config {
  constructor(fieldId) {
    const templates = new Templates();

    // this is used to identify a field type by validating a field's components against these values 
    this.fieldTypes = {
      every: {notNull: ['every']},
      range: {notNull: ['range']},
      scalar: {notNull: ['scalar']},
      every_step: {notNull: ['every', 'step_interval']},
      range_step: {notNull: ['range', 'step_interval']},
    };

    this.fieldMap = [ 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek' ];
    this.fieldDefaults = [ '*', '*', '*', '*', '*' ];

    this.constraints = [
      [ 0, 59 ], // Minute
      [ 0, 23 ], // Hour
      [ 1, 31 ], // Day of month
      [ 1, 12 ], // Month
      [ 0, 7 ] // Day of week
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
      },
      {
        condition: ['every', 'range'],
        format: templates.time['everyMinute_rangeHour']
      },
      {
        condition: ['every', 'scalar'],
        format: templates.time['everyMinute_scalarHour']
      },
      {
        condition: ['every', 'every_step'],
        format: templates.time['everyMinute_everyStepHour']
      },
      {
        condition: ['every', 'range_step'],
        format: templates.time['everyMinute_rangeStepHour']
      },
      // range minute
      {
        condition: ['range'],
        format: templates.time['rangeMinute']
      },
      {
        condition: ['range', 'range'],
        format: templates.time['rangeMinute_rangeHour']
      },
      {
        condition: ['range', 'scalar'],
        format: templates.time['rangeMinute_scalarHour']
      },
      {
        condition: ['range', 'every_step'],
        format: templates.time['rangeMinute_everyStepHour']
      },
      {
        condition: ['range', 'range_step'],
        format: templates.time['rangeMinute_rangeStepHour']
      },
      // scalar minute
      {
        condition: ['scalar'],
        format: templates.time['scalarMinute']
      },
      {
        condition: ['scalar', 'range'],
        format: templates.time['scalarMinute__rangeHour']
      },
      {
        condition: ['scalar', 'scalar'],
        // format: templates.time['default']
        format: templates.time['scalarMinute__scalarHour']
      },
      {
        condition: ['scalar', 'every_step'],
        format: templates.time['scalarMinute__everyStepHour']
      },
      {
        condition: ['scalar', 'range_step'],
        format: templates.time['scalarMinute__rangeStepHour']
      },
      // every step minute
      {
        condition: ['every_step'],
        format: templates.time['everyStepMinute']
      },
      {
        condition: ['every_step', 'range'],
        format: templates.time['everyStepMinute_rangeHour']
      },
      {
        condition: ['every_step', 'scalar'],
        format: templates.time['everyStepMinute_scalarHour']
      },
      {
        condition: ['every_step', 'every_step'],
        format: templates.time['everyStepMinute__everyStepHour']
      },
      {
        condition: ['every_step', 'range_step'],
        format: templates.time['everyStepMinute__rangeStepHour']
      },
      // range step minute
      {
        condition: ['range_step'],
        format: templates.time['rangeStepMinute']
      },
      {
        condition: ['range_step', 'range'],
        format: templates.time['rangeStepMinute__rangeHour']
      },
      {
        condition: ['range_step', 'scalar'],
        format: templates.time['rangeStepMinute__scalarHour']
      },
      {
        condition: ['range_step', 'every_step'],
        format: templates.time['rangeStepMinute__everyStepHour']
      },
      {
        condition: ['range_step', 'range_step'],
        format: templates.time['rangeStepMinute__rangeStepHour']
      },
    ];

    // conditional date templates (3rd and 4th fields)
    this.cdlDateTemplates = [
      // every day
      {
        condition: ['every'],
        format: templates.date['everyDay']
      },
      {
        condition: ['every', 'range'],
        format: templates.date['everyDay_rangeMonth']
      },
      {
        condition: ['every', 'scalar'],
        format: templates.date['everyDay_scalarMonth']
      },
      {
        condition: ['every', 'every_step'],
        format: templates.date['everyDay_everyStepMonth']
      },
      {
        condition: ['every', 'range_step'],
        format: templates.date['everyDay_rangeStepMonth']
      },
      // range day
      {
        condition: ['range'],
        format: templates.date['rangeDay']
      },
      {
        condition: ['range', 'range'],
        format: templates.date['rangeDay_rangeMonth']
      },
      {
        condition: ['range', 'scalar'],
        format: templates.date['rangeDay_scalarMonth']
      },
      {
        condition: ['range', 'every_step'],
        format: templates.date['rangeDay_everyStepMonth']
      },
      {
        condition: ['range', 'range_step'],
        format: templates.date['rangeDay_rangeStepMonth']
      },
      // scalar day
      {
        condition: ['scalar'],
        format: templates.date['scalarDay']
      },
      {
        condition: ['scalar', 'range'],
        format: templates.date['scalarDay_rangeMonth']
      },
      {
        condition: ['scalar', 'scalar'],
        format: templates.date['scalarDay_scalarMonth']
      },
      {
        condition: ['scalar', 'every_step'],
        format: templates.date['scalarDay_everyStepMonth']
      },
      {
        condition: ['scalar', 'range_step'],
        format: templates.date['scalarDay_rangeStepMonth']
      },
      // every step day
      {
        condition: ['every_step'],
        format: templates.date['everyStepDay']
      },
      {
        condition: ['every_step', 'range'],
        format: templates.date['everyStepDay_rangeMonth']
      },
      {
        condition: ['every_step', 'scalar'],
        format: templates.date['everyStepDay_scalarMonth']
      },
      {
        condition: ['every_step', 'every_step'],
        format: templates.date['everyStepDay_everyStepMonth']
      },
      {
        condition: ['every_step', 'range_step'],
        format: templates.date['everyStepDay_rangeStepMonth']
      },
      // range step day
      {
        condition: ['range_step'],
        format: templates.date['rangeStepDay']
      },
      {
        condition: ['range_step', 'range'],
        format: templates.date['rangeStepDay_rangeMonth']
      },
      {
        condition: ['range_step', 'scalar'],
        format: templates.date['rangeStepDay_scalarMonth']
      },
      {
        condition: ['range_step', 'every_step'],
        format: templates.date['rangeStepDay_everyStepMonth']
      },
      {
        condition: ['range_step', 'range_step'],
        format: templates.date['rangeStepDay_rangeStepMonth']
      },
    ];

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
      },
    ];

    this.cdlTimeDefaultTemplate = templates.time['default'];
    this.cdlDateDefaultTemplate = templates.date['default'];
    this.cdlDayOfWeekDefaultTemplate = templates.dow['default'];

    const phrases = [ 
      ['minute', 'minutes'],
      ['hour', 'hours'],
      ['day', 'days'],
      ['month', 'months'],
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Weekdays', 'Weekends'],
    ];

    this.phrases = phrases[fieldId];
  }

  getIndex(name) {
    return this.fieldMap.findIndex(function (val) {
      return name === val;
    })
  }

  getName(idx) {
    return this.fieldMap[idx];
  }
}