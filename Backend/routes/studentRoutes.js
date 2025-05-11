// src/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student (POST request)
router.post('/students', async (req, res) => {
  const { firstName, lastName, studentId, grade } = req.body;
  
  try {
    // Check if the student already exists by studentId
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    const student = new Student({
      firstName,
      lastName,
      studentId,
      grade,
    });

    // Save student to database
    await student.save();
    res.status(201).json(student); // Return the created student
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students (GET request)
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students); // Return all students
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student details (PATCH request)
router.patch('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, studentId, grade } = req.body;

  try {
    // Find student by ID
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student details with new data (only non-null fields will be updated)
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.studentId = studentId || student.studentId; // You can add a check to ensure ID is not changed if you want
    student.grade = grade || student.grade;

    // Save updated student
    await student.save();
    res.status(200).json(student); // Return the updated student
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a student's vaccination status (PATCH request) - this is the existing functionality
router.patch('/students/:id/vaccinate', async (req, res) => {
  const { id } = req.params;
  const { vaccineName, date } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.vaccinationStatus) {
      return res.status(400).json({ message: 'Student already vaccinated' });
    }

    student.vaccinationStatus = true;
    student.vaccinatedOn = date;
    student.vaccineName = vaccineName;

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
