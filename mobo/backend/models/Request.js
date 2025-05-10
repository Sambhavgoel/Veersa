const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: String,
  location: {
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', requestSchema);