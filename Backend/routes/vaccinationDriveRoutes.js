const express = require('express');
const router = express.Router();
const VaccinationDrive = require('../models/VaccinationDrive');

// Create a new vaccination drive
router.post('/vaccination-drives', async (req, res) => {
  const { vaccineName, date, totalDoses, appliedClasses, availableSlots } = req.body;
  
  try {
    const drive = new VaccinationDrive({
      vaccineName,
      date,
      totalDoses,
      appliedClasses,
      availableSlots,
    });
    await drive.save();
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all upcoming vaccination drives (within the next 30 days)
router.get('/vaccination-drives', async (req, res) => {
  const today = new Date();
  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);

  try {
    const drives = await VaccinationDrive.find({
      date: { $gte: today, $lte: next30Days },
    });
    res.status(200).json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
