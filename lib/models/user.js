const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  age: {
    type: Number,
    min: [0, 'You must enter a valid age.'],
    max: [130, 'You must enter a valid age.']
  }
});

module.exports = mongoose.model('User', schema);