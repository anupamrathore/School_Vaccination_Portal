const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const vaccinationDriveRoutes = require('./routes/vaccinationDriveRoutes');
const authRoutes = require('./routes/auth');
const { default: mongoose } = require('mongoose');

dotenv.config();

const app = express();

// ✅ Enable CORS before defining routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect DB
mongoose.connect("mongodb://localhost:27017/school_vaccine_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Define routes
app.use('/api', studentRoutes);
app.use('/api', vaccinationDriveRoutes);
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the School Vaccination Portal');
});

// ✅ Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

