const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

router.post('/', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.send(appointment);
});

router.get('/:userId', async (req, res) => {
  const appts = await Appointment.find({ $or: [{ doctorId: req.params.userId }, { patientId: req.params.userId }] });
  res.send(appts);
});

module.exports = router;
