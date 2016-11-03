const Record = require('../lib/models/record');
const assert = require('chai').assert;

describe('Record model', () => {

  it('validates with artist, title and year', done => {
    const record = new Record({
      artist: 'Willie Nelson',
      title: 'Stardust',
      year: 1978
    });
    record.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('artist field is required', done => {
    const record = new Record({
      title: 'Purple Rain',
      year: 1984
    });

    record.validate(err => {
      assert.isOk(err, 'you must enter an artist name');
      done();
    });
  });

  it('title field is required', done => {
    const record = new Record({
      artist: 'OutKast',
      year: 1996
    });

    record.validate(err => {
      assert.isOk(err, 'you must enter a title');
      done();
    });
  });

  it('year must be a valid year', done => {
    const record = new Record({
      artist: 'Future Band',
      title: 'We Are From The Future',
      year: 3000
    });

    record.validate(err => {
      assert.isOk(err, 'you must enter a valid year');
      done();
    });
  });

});