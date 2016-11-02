const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Record = require('../models/record');

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.artist) query.artist = req.query.artist;
    Record.find(query)
      .then(records => res.send(records))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Record.findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Record.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Record(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Record.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  });

  module.exports = router;