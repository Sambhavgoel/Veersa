const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create a new ambulance request
router.post('/request', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all requests (for hospital view)
router.get('/requests', async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

module.exports = router;