const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🚑 Ambulance backend is running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});


// ... previous code
const requestRoutes = require('./routes/requestRoutes');

app.use('/api', requestRoutes);