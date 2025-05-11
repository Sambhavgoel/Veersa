require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requestRoutes'); // For ambulance requests

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api', requestRoutes);
// app.use('/api', require('./routes/ambulanceRoute'));


// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(5000, '0.0.0.0', () => {
  console.log(`Server is running on port 5000`);
});