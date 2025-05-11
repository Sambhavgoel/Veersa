const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  number: String,
  degree: String,
  experience: String,
  password: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports = mongoose.model('Doctor', doctorSchema);