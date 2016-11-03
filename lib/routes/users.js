const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.name) query.name = req.query.name;
    User.find(query)
      .then(users => res.send(users))
      .catch(next);
  })


  .get('/average-age', (req, res, next) => {
    User.aggregate([
      { $group: {
        _id: '$User',
        avgAge: { $avg: '$age'}
      }}
    ], function (err, results) {
      if (err) {
        console.error(err);
      } else {
        let averageObj = {
          averageAge: results[0].avgAge
        };
        res.send(averageObj);
     }
    });
  })
  
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new User(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(saved => res.send(saved))
      .catch(next);
  });

  module.exports = router;
