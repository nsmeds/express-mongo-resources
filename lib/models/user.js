const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('User', schema);