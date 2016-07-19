var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var Corny = require('../lib/corny');

describe('Time templates', function () {

  describe('new Corny():', function () {
    it('should return an onject', function () {
      const corny = new Corny('* * * * *');
      corny.should.be.a('object');
    });
  });

  // every minute
  describe('everyMinute:', function () {
    it('* * * * * === Every minute', function () {
      const corny = new Corny('* * * * *');
      corny.phrase.should.equal('Every minute');
    });
  });
  describe('everyMinute_rangeHour:', function () {
    it('* 0-12 * * * === Every minute between the hours of 0:00-12:00', function () {
      const corny = new Corny('* 0-12 * * *');
      corny.phrase.should.equal('Every minute between the hours of 0:00-12:00');
    });
    it('* 1-2,4-5 * * * === Every minute between the hours of 1:00-2:00 and 4:00-5:00', function () {
      const corny = new Corny('* 1-2,4-5 * * *');
      corny.phrase.should.equal('Every minute between the hours of 1:00-2:00 and 4:00-5:00');
    });
    it('* 0-2,4-5,12-14,19-23 * * * === Every minute between the hours of 0:00-2:00, 4:00-5:00, 12:00-14:00, and 19:00-23:00', function () {
      const corny = new Corny('* 0-2,4-5,12-14,19-23 * * *');
      corny.phrase.should.equal('Every minute between the hours of 0:00-2:00, 4:00-5:00, 12:00-14:00, and 19:00-23:00');
    });
  });
  describe('everyMinute_scalarHour:', function () {
    it('* 12 * * * === Every minute at 12:00', function () {
      const corny = new Corny('* 12 * * *');
      corny.phrase.should.equal('Every minute at 12:00');
    });
    it('* 0,12 * * * === Every minute at 0:00 and 12:00', function () {
      const corny = new Corny('* 0,12 * * *');
      corny.phrase.should.equal('Every minute at 0:00 and 12:00');
    });
    it('* 0,4,8,12 * * * === Every minute at 0:00, 4:00, 8:00, and 12:00', function () {
      const corny = new Corny('* 0,4,8,12 * * *');
      corny.phrase.should.equal('Every minute at 0:00, 4:00, 8:00, and 12:00');
    });
  });
  describe('everyMinute_everyStepHour:', function () {
    it('* */5 * * * === Every minute at every 5 hours', function () {
      const corny = new Corny('* */5 * * *');
      corny.phrase.should.equal('Every minute at every 5 hours');
    });
    it('* */2,*/9 * * * === Every minute at every 2 and 9 hours', function () {
      const corny = new Corny('* */2,*/9 * * *');
      corny.phrase.should.equal('Every minute at every 2 and 9 hours');
    });
  });
  describe('everyMinute_rangeStepHour:', function () {
    it('* 1-12/5 * * * === Every minute at every 5 hours between 1:00-12:00', function () {
      const corny = new Corny('* 1-12/5 * * *');
      corny.phrase.should.equal('Every minute at every 5 hours between 1:00-12:00');
    });
  });


  // range minute
  describe('rangeMinute:', function () {
    it('1-30 * * * * === At each minute between 01-30 of every hour', function () {
      const corny = new Corny('1-30 * * * *');
      corny.phrase.should.equal('At each minute between 01-30 of every hour');
    });
    it('1-30,40-50 * * * * === At each minute between 01-30 and 40-50 of every hour', function () {
      const corny = new Corny('1-30,40-50 * * * *');
      corny.phrase.should.equal('At each minute between 01-30 and 40-50 of every hour');
    });
    it('0-10,20-30,40-50 * * * * === At each minute between 00-10, 20-30, and 40-50 of every hour', function () {
      const corny = new Corny('0-10,20-30,40-50 * * * *');
      corny.phrase.should.equal('At each minute between 00-10, 20-30, and 40-50 of every hour');
    });
  });
  describe('rangeMinute_rangeHour:', function () {
    it('1-30 11-14 * * * === At each minute between 01-30 of the hours between 11:00-14:00', function () {
      const corny = new Corny('1-30 11-14 * * *');
      corny.phrase.should.equal('At each minute between 01-30 of the hours between 11:00-14:00');
    });
  });
  describe('rangeMinute_scalarHour:', function () {
    it('1-30 1,4,8 * * * === At each minute between 01-30 of the hours 1:00, 4:00, and 8:00', function () {
      const corny = new Corny('1-30 1,4,8 * * *');
      corny.phrase.should.equal('At each minute between 01-30 of the hours 1:00, 4:00, and 8:00');
    });
  });
  describe('rangeMinute_everyStepHour:', function () {
    it('1-30 */2,*/9 * * * === At each minute between 01-30 of every 2 and 9 hours', function () {
      const corny = new Corny('1-30 */2,*/9 * * *');
      corny.phrase.should.equal('At each minute between 01-30 of every 2 and 9 hours');
    });
  });
  describe('rangeMinute_rangeStepHour:', function () {
    it('1-30 1-12/2 * * * === At each minute between 01-30 of every 2 hours between 1:00-12:00', function () {
      const corny = new Corny('1-30 1-12/2 * * *');
      corny.phrase.should.equal('At each minute between 01-30 of every 2 hours between 1:00-12:00');
    });
  });


  // scalar minute
  describe('scalarMinute:', function () {
    it('0 * * * * === At 00 minutes past every hour', function () {
      const corny = new Corny('0 * * * *');
      corny.phrase.should.equal('At 00 minutes past every hour');
    });
    it('0,30 * * * * === At 00 and 30 minutes past every hour', function () {
      const corny = new Corny('0,30 * * * *');
      corny.phrase.should.equal('At 00 and 30 minutes past every hour');
    });
    it('1,15,45 * * * * === At 01, 15, and 45 minutes past every hour', function () {
      const corny = new Corny('1,15,45 * * * *');
      corny.phrase.should.equal('At 01, 15, and 45 minutes past every hour');
    });
  });
  describe('scalarMinute__rangeHour:', function () {
    it('0 1-5 * * * === At 00 minutes past the hours between 1:00-5:00', function () {
      const corny = new Corny('0 1-5 * * *');
      corny.phrase.should.equal('At 00 minutes past the hours between 1:00-5:00');
    });
    it('0,15,30 0-4,10-14 * * * === At 00, 15, and 30 minutes past the hours between 0:00-4:00 and 10:00-14:00', function () {
      const corny = new Corny('0,15,30 0-4,10-14 * * *');
      corny.phrase.should.equal('At 00, 15, and 30 minutes past the hours between 0:00-4:00 and 10:00-14:00');
    });
  });
  describe('scalarMinute__scalarHour:', function () {
    it('0 1 * * * === At 00 minutes past 1:00', function () {
      const corny = new Corny('0 1 * * *');
      corny.phrase.should.equal('At 00 minutes past 1:00');
    });
    it('0,15,30 0,12,16 * * * === At 00, 15, and 30 minutes past 0:00, 12:00, and 16:00', function () {
      const corny = new Corny('0,15,30 0,12,16 * * *');
      corny.phrase.should.equal('At 00, 15, and 30 minutes past 0:00, 12:00, and 16:00');
    });
  });
  describe('scalarMinute__everyStepHour:', function () {
    it('0 */2 * * * === At 00 minutes of every 2 hours', function () {
      const corny = new Corny('0 */2 * * *');
      corny.phrase.should.equal('At 00 minutes of every 2 hours');
    });
    it('0,15,30 */2,*/9 * * * === At 00, 15, and 30 minutes of every 2 and 9 hours', function () {
      const corny = new Corny('0,15,30 */2,*/9 * * *');
      corny.phrase.should.equal('At 00, 15, and 30 minutes of every 2 and 9 hours');
    });
  });
  describe('scalarMinute__rangeStepHour:', function () {
    it('0 1-12/2 * * * === At 00 minutes of every 2 hours between 1:00-12:00', function () {
      const corny = new Corny('0 1-12/2 * * *');
      corny.phrase.should.equal('At 00 minutes of every 2 hours between 1:00-12:00');
    });
  });


  // every step minute
  describe('everyStepMinute:', function () {
    it('*/1 * * * * === Every 1 minute', function () {
      const corny = new Corny('*/1 * * * *');
      corny.phrase.should.equal('Every 1 minute');
    });
    it('*/5 * * * * === Every 5 minutes', function () {
      const corny = new Corny('*/5 * * * *');
      corny.phrase.should.equal('Every 5 minutes');
    });
    it('*/9,*/14 * * * * === Every 9 and 14 minutes', function () {
      const corny = new Corny('*/9,*/14 * * * *');
      corny.phrase.should.equal('Every 9 and 14 minutes');
    });
  });
  describe('everyStepMinute_rangeHour:', function () {
    it('*/1 0-2 * * * === Every 1 minute between the hours of 0:00-2:00', function () {
      const corny = new Corny('*/1 0-2 * * *');
      corny.phrase.should.equal('Every 1 minute between the hours of 0:00-2:00');
    });
    it('*/5 1-2,4-5 * * * === Every 5 minutes between the hours of 1:00-2:00 and 4:00-5:00', function () {
      const corny = new Corny('*/5 1-2,4-5 * * *');
      corny.phrase.should.equal('Every 5 minutes between the hours of 1:00-2:00 and 4:00-5:00');
    });
  });
  describe('everyStepMinute_scalarHour:', function () {
    it('*/5 1,11 * * * === Every 5 minutes past 1:00 and 11:00', function () {
      const corny = new Corny('*/5 1,11 * * *');
      corny.phrase.should.equal('Every 5 minutes past 1:00 and 11:00');
    });
  });
  describe('everyStepMinute__everyStepHour:', function () {
    it('*/5 */4 * * * === Every 5 minutes of every 4 hours', function () {
      const corny = new Corny('*/5 */4 * * *');
      corny.phrase.should.equal('Every 5 minutes of every 4 hours');
    });
    it('*/5 */4,*/9 * * * === Every 5 minutes of every 4 and 9 hours', function () {
      const corny = new Corny('*/5 */4,*/9 * * *');
      corny.phrase.should.equal('Every 5 minutes of every 4 and 9 hours');
    });
  });
  describe('everyStepMinute__rangeStepHour:', function () {
    it('*/5 1-12/2 * * * === Every 5 minutes of every 2 hours between 1:00-12:00', function () {
      const corny = new Corny('*/5 1-12/2 * * *');
      corny.phrase.should.equal('Every 5 minutes of every 2 hours between 1:00-12:00');
    });
  });


  // range step minute
  describe('rangeStepMinute:', function () {
    it('0-10/2 * * * * === Every 2 minutes between 00-10 minutes past every hour', function () {
      const corny = new Corny('0-10/2 * * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes past every hour');
    });
  });
  describe('rangeStepMinute__rangeHour:', function () {
    it('0-10/2 1-4 * * * === Every 2 minutes between 00-10 minutes between the hours of 1:00-4:00', function () {
      const corny = new Corny('0-10/2 1-4 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes between the hours of 1:00-4:00');
    });
    it('0-10/2 1-4,14-19 * * * === Every 2 minutes between 00-10 minutes between the hours of 1:00-4:00 and 14:00-19:00', function () {
      const corny = new Corny('0-10/2 1-4,14-19 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes between the hours of 1:00-4:00 and 14:00-19:00');
    });
  });
  describe('rangeStepMinute__scalarHour:', function () {
    it('0-10/2 23 * * * === Every 2 minutes between 00-10 minutes past 23:00', function () {
      const corny = new Corny('0-10/2 23 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes past 23:00');
    });
    it('0-10/2 12,18,23 * * * === Every 2 minutes between 00-10 minutes past 12:00, 18:00, and 23:00', function () {
      const corny = new Corny('0-10/2 12,18,23 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes past 12:00, 18:00, and 23:00');
    });
  });
  describe('rangeStepMinute__everyStepHour:', function () {
    it('0-10/2 */2 * * * === Every 2 minutes between 00-10 minutes of every 2 hours', function () {
      const corny = new Corny('0-10/2 */2 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes of every 2 hours');
    });
  });
  describe('rangeStepMinute__rangeStepHour:', function () {
    it('0-10/2 1-12/2 * * * === Every 2 minutes between 00-10 minutes of every 2 hours between 1:00-12:00', function () {
      const corny = new Corny('0-10/2 1-12/2 * * *');
      corny.phrase.should.equal('Every 2 minutes between 00-10 minutes of every 2 hours between 1:00-12:00');
    });
  });


  // no matched templates
  describe('default:', function () {
    it('2,4,6,40-45 1,2 * * * === At 1:02, 1:04, 1:06, 1:40, 1:41, 1:42, 1:43, 1:44, 1:45, 2:02, 2:04, 2:06, 2:40, 2:41, 2:42, 2:43, 2:44, and 2:45', function () {
      const corny = new Corny('2,4,6,40-45 1,2 * * *');
      corny.phrase.should.equal('At 1:02, 1:04, 1:06, 1:40, 1:41, 1:42, 1:43, 1:44, 1:45, 2:02, 2:04, 2:06, 2:40, 2:41, 2:42, 2:43, 2:44, and 2:45');
    });
  });

  
  describe('Constraint errors:', function () {
    it('60 * * * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('60 * * * *');
      }).to.throw('Constraint error, got value 60 expected range 0-59');
    });
    it('0-60 * * * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('0-60 * * * *');
      }).to.throw('Constraint error, got range 0-60 expected range 0-59');
    });
    it('* 25 * * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('* 25 * * *');
      }).to.throw('Constraint error, got value 25 expected range 0-23');
    });
    it('* 0-25 * * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('* 0-25 * * *');
      }).to.throw('Constraint error, got range 0-25 expected range 0-23');
    });
  });


});

