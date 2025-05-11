const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');


// Signup route
router.post('/signup', async (req, res) => {
  const {
    role,
    name,
    age,
    email,
    number,
    degree,
    experience,
    password,
    location // { latitude, longitude }
  } = req.body;

  try {
    if (role === 'doctor') {
      const existing = await Doctor.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Doctor already exists' });

      const newDoctor = new Doctor({
        name,
        age,
        email,
        number,
        degree,
        experience,
        password,
        location,
      });
      await newDoctor.save();
      console.log('Doctor signed up with location:', location);
      return res.status(201).json({ message: 'Doctor registered successfully' });
    }

    else if (role === 'patient') {
      const existing = await Patient.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Patient already exists' });

      const newPatient = new Patient({
        name,
        age,
        email,
        number,
        password,
        location,
      });
      await newPatient.save();
      console.log('Patient signed up with location:', location);
      return res.status(201).json({ message: 'Patient registered successfully' });
    }

    res.status(400).json({ message: 'Invalid role' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let user;
    if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (role === 'patient') {
      user = await Patient.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ message: `${role} not found` });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });

    res.json({ message: `${role} logged in successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;