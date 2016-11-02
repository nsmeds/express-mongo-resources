const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  artist: String,
  title: String,
  year: Number
});

module.exports = mongoose.model('Record', schema);