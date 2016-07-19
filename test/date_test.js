var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var Corny = require('../lib/corny');

describe('Date templates', function () {

  // every day
  describe('everyDay:', function () {
    it('* * * * * === Every minute', function () {
      const corny = new Corny('* * * * *');
      corny.phrase.should.equal('Every minute');
    });
  });
  describe('everyDay_rangeMonth:', function () {
    it('* * * 1-3 * === Every minute on every day between Jan-Mar', function () {
      const corny = new Corny('* * * 1-3 *');
      corny.phrase.should.equal('Every minute on every day between Jan-Mar');
    });
    it('* * * 1-3,6-10 * === Every minute on every day between Jan-Mar and Jun-Oct', function () {
      const corny = new Corny('* * * 1-3,6-10 *');
      corny.phrase.should.equal('Every minute on every day between Jan-Mar and Jun-Oct');
    });
  });
  describe('everyDay_scalarMonth:', function () {
    it('* * * 1 * === Every minute on every day in Jan', function () {
      const corny = new Corny('* * * 1 *');
      corny.phrase.should.equal('Every minute on every day in Jan');
    });
    it('* * * 1,6,10 * === Every minute on every day in Jan, Jun, and Oct', function () {
      const corny = new Corny('* * * 1,6,10 *');
      corny.phrase.should.equal('Every minute on every day in Jan, Jun, and Oct');
    });
  });
  describe('everyDay_everyStepMonth:', function () {
    it('* * * */3 * === Every minute on every day of every 3 months', function () {
      const corny = new Corny('* * * */3 *');
      corny.phrase.should.equal('Every minute on every day of every 3 months');
    });
  });
  describe('everyDay_rangeStepMonth:', function () {
    it('* * * 1-6/2 * === Every minute on every day of every 2 months between Jan-Jun', function () {
      const corny = new Corny('* * * 1-6/2 *');
      corny.phrase.should.equal('Every minute on every day of every 2 months between Jan-Jun');
    });
  });


  // range day
  describe('rangeDay:', function () {
    it('* * 1-5 * * === Every minute on each day between the 1st & 5th of every month', function () {
      const corny = new Corny('* * 1-5 * *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of every month');
    });
    it('* * 1-5,15-20 * * === Every minute on each day between the 1st & 5th and 15th & 20th of every month', function () {
      const corny = new Corny('* * 1-5,15-20 * *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th and 15th & 20th of every month');
    });
  });
  describe('rangeDay_rangeMonth:', function () {
    it('* * 1-5 1-6 * === Every minute on each day between the 1st & 5th of the months between Jan-Jun', function () {
      const corny = new Corny('* * 1-5 1-6 *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of the months between Jan-Jun');
    });
    it('* * 1-5 jan-jun * === Every minute on each day between the 1st & 5th of the months between Jan-Jun', function () {
      const corny = new Corny('* * 1-5 1-6 *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of the months between Jan-Jun');
    });
  });
  describe('rangeDay_scalarMonth:', function () {
    it('* * 1-5 1,4,8 * === Every minute on each day between the 1st & 5th of Jan, Apr, and Aug', function () {
      const corny = new Corny('* * 1-5 1,4,8 *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of Jan, Apr, and Aug');
    });
  });
  describe('rangeDay_everyStepMonth:', function () {
    it('* * 1-5 */3 * === Every minute on each day between the 1st & 5th of every 3 months', function () {
      const corny = new Corny('* * 1-5 */3 *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of every 3 months');
    });
  });
  describe('rangeDay_rangeStepMonth:', function () {
    it('* * 1-5 1-10/2 * === Every minute on each day between the 1st & 5th of every 2 months between Jan-Oct', function () {
      const corny = new Corny('* * 1-5 1-10/2 *');
      corny.phrase.should.equal('Every minute on each day between the 1st & 5th of every 2 months between Jan-Oct');
    });
  });


  // scalar day
  describe('scalarDay:', function () {
    it('* * 1 * * === Every minute on the 1st day of every month', function () {
      const corny = new Corny('* * 1 * *');
      corny.phrase.should.equal('Every minute on the 1st day of every month');
    });
    it('* * 1,10,20 * * === Every minute on the 1st, 10th, and 20th day of every month', function () {
      const corny = new Corny('* * 1,10,20 * *');
      corny.phrase.should.equal('Every minute on the 1st, 10th, and 20th day of every month');
    });
  });
  describe('scalarDay_rangeMonth:', function () {
    it('* * 1 1-10 * === Every minute on the 1st day of the months between Jan-Oct', function () {
      const corny = new Corny('* * 1 1-10 *');
      corny.phrase.should.equal('Every minute on the 1st day of the months between Jan-Oct');
    });
  });
  describe('scalarDay_scalarMonth:', function () {
    it('* * 1 1,5,8 * === Every minute on the 1st day of Jan, May, and Aug', function () {
      const corny = new Corny('* * 1 1,5,8 *');
      corny.phrase.should.equal('Every minute on the 1st day of Jan, May, and Aug');
    });
  });
  describe('scalarDay_everyStepMonth:', function () {
    it('* * 1 */3 * === Every minute on the 1st day of every 3 months', function () {
      const corny = new Corny('* * 1 */3 *');
      corny.phrase.should.equal('Every minute on the 1st day of every 3 months');
    });
  });
  describe('scalarDay_rangeStepMonth:', function () {
    it('* * 1 1-10/2 * === Every minute on the 1st day of every 2 months between Jan-Oct', function () {
      const corny = new Corny('* * 1 1-10/2 *');
      corny.phrase.should.equal('Every minute on the 1st day of every 2 months between Jan-Oct');
    });
  });

  // every step day
  describe('everyStepDay:', function () {
    it('* * */5 * * === Every minute on every 5 days of every month', function () {
      const corny = new Corny('* * */5 * *');
      corny.phrase.should.equal('Every minute on every 5 days of every month');
    });
  });
  describe('everyStepDay_rangeMonth:', function () {
    it('* * */5 1-10 * === Every minute on every 5 days of the months between Jan-Oct', function () {
      const corny = new Corny('* * */5 1-10 *');
      corny.phrase.should.equal('Every minute on every 5 days of the months between Jan-Oct');
    });
  });
  describe('everyStepDay_scalarMonth:', function () {
    it('* * */5 1,5,8 * === Every minute on every 5 days of Jan, May, and Aug', function () {
      const corny = new Corny('* * */5 1,5,8 *');
      corny.phrase.should.equal('Every minute on every 5 days of Jan, May, and Aug');
    });
  });
  describe('everyStepDay_everyStepMonth:', function () {
    it('* * */5 */3 * === Every minute on every 5 days of every 3 months', function () {
      const corny = new Corny('* * */5 */3 *');
      corny.phrase.should.equal('Every minute on every 5 days of every 3 months');
    });
  });
  describe('everyStepDay_rangeStepMonth:', function () {
    it('* * */5 1-10/2 * === Every minute on every 5 days of every 2 months between Jan-Oct', function () {
      const corny = new Corny('* * */5 1-10/2 *');
      corny.phrase.should.equal('Every minute on every 5 days of every 2 months between Jan-Oct');
    });
  });

  // range step day
  describe('rangeStepDay:', function () {
    it('* * 1-10/2 * * === Every minute on every 2 days between the 1st & 10th of every month', function () {
      const corny = new Corny('* * 1-10/2 * *');
      corny.phrase.should.equal('Every minute on every 2 days between the 1st & 10th of every month');
    });
  });
  describe('rangeStepDay_rangeMonth:', function () {
    it('* * 1-10/2 1-10 * === Every minute on every 2 days between the 1st & 10th of the months between Jan-Oct', function () {
      const corny = new Corny('* * 1-10/2 1-10 *');
      corny.phrase.should.equal('Every minute on every 2 days between the 1st & 10th of the months between Jan-Oct');
    });
  });
  describe('rangeStepDay_scalarMonth:', function () {
    it('* * 1-10/2 1,5,8 * === Every minute on every 2 days between the 1st & 10th of Jan, May, and Aug', function () {
      const corny = new Corny('* * 1-10/2 1,5,8 *');
      corny.phrase.should.equal('Every minute on every 2 days between the 1st & 10th of Jan, May, and Aug');
    });
  });
  describe('rangeStepDay_everyStepMonth:', function () {
    it('* * 1-10/2 */3 * === Every minute on every 2 days between the 1st & 10th of every 3 months', function () {
      const corny = new Corny('* * 1-10/2 */3 *');
      corny.phrase.should.equal('Every minute on every 2 days between the 1st & 10th of every 3 months');
    });
  });
  describe('rangeStepDay_rangeStepMonth:', function () {
    it('* * 1-10/2 1-10/2 * === Every minute on every 2 days between the 1st & 10th of every 2 months between Jan-Oct', function () {
      const corny = new Corny('* * 1-10/2 1-10/2 *');
      corny.phrase.should.equal('Every minute on every 2 days between the 1st & 10th of every 2 months between Jan-Oct');
    });
  });


  // day of the week tests
  describe('day of week:', function () {
    it('* * * * 1-5 === Every minute on Mon-Fri', function () {
      const corny = new Corny('* * * * 1-5');
      corny.phrase.should.equal('Every minute on Mon-Fri');
    });
    it('* * * * 0,6 === Every minute on Sun and Sat', function () {
      const corny = new Corny('* * * * 0,6');
      corny.phrase.should.equal('Every minute on Sun and Sat');
    });
    it('* * * * */2 === Every minute on every 2 days of the week', function () {
      const corny = new Corny('* * * * */2');
      corny.phrase.should.equal('Every minute on every 2 days of the week');
    });
    it('* * * * 1-5/2 === Every minute on every 2 days of the week between Mon-Fri', function () {
      const corny = new Corny('* * * * 1-5/2');
      corny.phrase.should.equal('Every minute on every 2 days of the week between Mon-Fri');
    });
    it('30 4 1 * 0,6 === At 30 minutes past 4:00 on the 1st day of every month, plus on Sun and Sat', function () {
      const corny = new Corny('30 4 1 * 0,6');
      corny.phrase.should.equal('At 30 minutes past 4:00 on the 1st day of every month, plus on Sun and Sat');
    });
  });


  // month names
  describe('month names:', function () {
    it('* * 1 JAN * === Every minute on the 1st day of Jan', function () {
      const corny = new Corny('* * 1 JAN *');
      corny.phrase.should.equal('Every minute on the 1st day of Jan');
    });
    it('* * 1,15,21 JAN,mar,Dec * === Every minute on the 1st, 15th, and 21st day of Jan, Mar, and Dec', function () {
      const corny = new Corny('* * 1,15,21 JAN,mar,Dec *');
      corny.phrase.should.equal('Every minute on the 1st, 15th, and 21st day of Jan, Mar, and Dec');
    });
  });


  // month name capitalization in return val
  describe('month name capitalization in return val:', function () {
    it('* * 1 JAN * === * * 1 JAN *', function () {
      const corny = new Corny('* * 1 JAN *');
      corny.val.should.equal('* * 1 JAN *');
    });
    it('* * 1,15,21 JAN,mar,Dec * === * * 1,15,21 JAN,MAR,DEC *', function () {
      const corny = new Corny('* * 1,15,21 JAN,mar,Dec *');
      corny.val.should.equal('* * 1,15,21 JAN,MAR,DEC *');
    });
    it('* * 1,15,21 * mon-fri === * * 1,15,21 * MON-FRI', function () {
      const corny = new Corny('* * 1,15,21 * mon-fri');
      corny.val.should.equal('* * 1,15,21 * MON-FRI');
    });
  });


  // ensure components are capitalized
  describe('ensure components are capitalized:', function () {
    it('* * 1 jan * === JAN', function () {
      const corny = new Corny('* * 1 jan *');
      corny.fields.month.components[0].scalar.should.equal('JAN');
    });
    it('* * 1,15,21 JAN,mar,Dec * === JAN,MAR,DEC', function () {
      const corny = new Corny('* * 1,15,21 JAN,mar,Dec *');
      corny.fields.month.components[0].scalar.should.equal('JAN');
      corny.fields.month.components[1].scalar.should.equal('MAR');
      corny.fields.month.components[2].scalar.should.equal('DEC');
    });
    it('* * 1,15,21 * mon-fri === MON-FRI', function () {
      const corny = new Corny('* * 1,15,21 * mon-fri');
      corny.fields.dayOfWeek.components[0].range.from.should.equal('MON');
      corny.fields.dayOfWeek.components[0].range.to.should.equal('FRI');
    });
  });


  // ensure field vals are capitalized
  describe('ensure field vals are capitalized:', function () {
    it('* * 1 jan * === JAN', function () {
      const corny = new Corny('* * 1 jan *');
      corny.fields.month.val.should.equal('JAN');
    });
    it('* * 1,15,21 JAN,mar,Dec * === JAN,MAR,DEC', function () {
      const corny = new Corny('* * 1,15,21 JAN,mar,Dec *');
      corny.fields.month.val.should.equal('JAN,MAR,DEC');
    });
    it('* * 1,15,21 * mon-fri === MON-FRI', function () {
      const corny = new Corny('* * 1,15,21 * mon-fri');
      corny.fields.dayOfWeek.val.should.equal('MON-FRI');
    });
  });


  // day of week names
  describe('day of week names:', function () {
    it('* * * * MON === Every minute on Mon', function () {
      const corny = new Corny('* * * * MON');
      corny.phrase.should.equal('Every minute on Mon');
    });
    it('* * * * MON-FRI === Every minute on Mon-Fri', function () {
      const corny = new Corny('* * * * MON-FRI');
      corny.phrase.should.equal('Every minute on Mon-Fri');
    });
    it('* * * * Sat,Sun === Every minute on Sat and Sun', function () {
      const corny = new Corny('* * * * Sat,Sun');
      corny.phrase.should.equal('Every minute on Sat and Sun');
    });
  });


  // day of month suffixes
  describe('ends with th:', function () {
    it('* * 11 1 * === Every minute on the 11th day of Jan', function () {
      const corny = new Corny('* * 11 1 *');
      corny.phrase.should.equal('Every minute on the 11th day of Jan');
    });
    it('* * 12 1 * === Every minute on the 12th day of Jan', function () {
      const corny = new Corny('* * 12 1 *');
      corny.phrase.should.equal('Every minute on the 12th day of Jan');
    });
    it('* * 13 1 * === Every minute on the 13th day of Jan', function () {
      const corny = new Corny('* * 13 1 *');
      corny.phrase.should.equal('Every minute on the 13th day of Jan');
    });
  });


  // no matched template
  describe('default:', function () {
    it('* * */5,1-20 * * === Every minute on the 1st, 6th, 11th, 16th, 26th, and 31st of every month', function () {
      const corny = new Corny('* * */5,1-20 * *');
      corny.phrase.should.equal('Every minute on the 1st, 6th, 11th, 16th, 21st, 26th, and 31st of every month');
    });
  });


  describe('Constraint errors:', function () {
    it('* * 0 * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('* * 0 * *');
      }).to.throw('Constraint error, got value 0 expected range 1-31');
    });
    it('* * 32 * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('* * 32 * *');
      }).to.throw('Constraint error, got value 32 expected range 1-31');
    });
    it('* * 0-15 * * should throw "Constraint error..."', function () {
      expect(function () {
        const corny = new Corny('* * 0-15 * *');
      }).to.throw('Constraint error, got range 0-15 expected range 1-31');
    });
  });


});

