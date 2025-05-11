const mongoose = require('mongoose');

const vaccinationDriveSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalDoses: {
    type: Number,
    required: true,
  },
  appliedClasses: {
    type: [String],  // Example: ['5th grade', '6th grade']
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('VaccinationDrive', vaccinationDriveSchema);

