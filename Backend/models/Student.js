const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  vaccinationStatus: {
    type: Boolean,
    default: false, // Default: not vaccinated
  },
  vaccinatedOn: {
    type: Date,
  },
  vaccineName: {
    type: String,
  },
});

module.exports = mongoose.model('Student', studentSchema);
