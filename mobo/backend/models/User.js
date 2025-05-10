const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['doctor', 'patient'] },
  phone: String,
  location: String,
  availableDates: [String],
  slots: [
    {
      date: String,
      time: String,
      mode: String // online or offline
    }
  ]
});
module.exports = mongoose.model('User', UserSchema);