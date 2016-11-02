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

  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })

  // .get('/averageAge', (req, res, next) => {
  //   User.where("age").
  // })

  .delete('/:id', (req, res, next) => {
    User.remove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new User(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  });

  module.exports = router;
