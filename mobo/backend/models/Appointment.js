const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  patientId: mongoose.Schema.Types.ObjectId,
  date: String,
  time: String,
  mode: String,
  status: { type: String, default: 'scheduled' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

