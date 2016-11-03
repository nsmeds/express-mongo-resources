const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('user api', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'users';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const fanBoy = {
    name: 'DJ Laptop',
    age: 40
  };

  it('/GET all', done => {
    request
      .get('/api/users')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      });
  });

  it('/POST', done => {
    request
      .post('/api/users')
      .send(fanBoy)
      .then(res => {
        const user = res.body;
        assert.ok(user._id);
        fanBoy.__v = 0;
        fanBoy._id = user._id;
        done();
      })
      .catch(done);
  });

  it('/GET a user by id', done => {
    request
      .get(`/api/users/${fanBoy._id}`)
      .then(res => {
        const user = res.body;
        assert.deepEqual(user, fanBoy);
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => {
    request
      .get('/api/users')
      .then(res => {
        assert.deepEqual(res.body, [fanBoy]);
        done();
      })
      .catch(done);
  });

  it('/GET users of a specific age', done => {
    request
      .get('/api/users')
      .query({age: 40})
      .then(res => {
        assert.deepEqual(res.body, [fanBoy]);
        done();
      })
      .catch(done);
  });
});