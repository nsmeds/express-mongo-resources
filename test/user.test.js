const User = require('../lib/models/user');
const assert = require('chai').assert;

describe('User model', () => {

  it('validates with name and age', done => {
    const user = new User({
      name: 'Rocky Balboa',
      age: 57
    });

    user.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const user = new User({
      age: 16
    });

    user.validate(err => {
      assert.isOk(err, 'you must enter a name');
      done();
    });
  });

  it('age must be a valid age', done => {
    const user = new User({
      name: 'Marie Curie',
      age: 148
    });

    user.validate(err => {
      assert.isOk(err, 'you must enter an age between 0 and 130');
      done();
    });
  });
});