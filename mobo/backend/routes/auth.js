const express = require('express');
const User = require('../models/User');
const router = express.Router();

// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.send(user);
    else res.status(401).send('Invalid credentials');
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Login failed' });
  }
});

router.put('/:id/available-dates', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { availableDates: req.body.dates });
  res.send({ success: true });
});

module.exports = router;
