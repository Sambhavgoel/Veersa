const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  number: String,
  password: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports = mongoose.model('Patient', patientSchema);