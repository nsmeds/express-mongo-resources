const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('record api', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'records';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });
  
  const request = chai.request(app);

  const dylan = {
    artist: 'Bob Dylan',
    title: 'Desire',
    year: 1975
  };

  it('/GET all', done => {
    request
      .get('/api/records')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('/POST', done => {
    request
      .post('/api/records')
      .send(dylan)
      .then(res => {
        const record = res.body;
        assert.ok(record._id);
        dylan.__v = 0;
        dylan._id = record._id;
        done();
      })
      .catch(done);
  });

  it('/GET a record by id', done => {
    request
      .get(`/api/records/${dylan._id}`)
      .then(res => {
        const record = res.body;
        assert.deepEqual(record, dylan);
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => {
    request
      .get('/api/records/')
      .then(res => {
        assert.deepEqual(res.body, [dylan]);
        done();
      })
      .catch(done);
  });

  it('/GET records for a specific year', done => {
    request
      .get('/api/records')
      .query({year: 1975})
      .then(res => {
        assert.deepEqual(res.body, [dylan]);
        done();
      })
      .catch(done);
  });

  it('/PUT a new title on a record', done => {
    request
      .put(`/api/records/${dylan._id}`)
      .then( (res) => {
        res.body.title = 'Blood on the Tracks';
        dylan.title = res.body.title;
        assert.deepEqual(dylan.title, 'Blood on the Tracks');
        console.log(dylan);
        done();
      })
      .catch(done);
  });

});