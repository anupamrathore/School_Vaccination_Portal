import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    grade: '',
  });
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false); // For tracking if the user is editing an existing student
  const [selectedStudentId, setSelectedStudentId] = useState(null); // To track the student being edited
  const navigate = useNavigate();

  // Fetching all students
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, []);

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  // Handle form submission for adding or updating a student
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = editing 
      ? `http://localhost:5000/api/students/${selectedStudentId}` // Update request
      : 'http://localhost:5000/api/students'; // Add request

    const method = editing ? 'PATCH' : 'POST'; // Use PATCH for updating

    try {
      await axios({
        method: method,
        url: apiUrl,
        data: studentData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if necessary
        },
      });

      // If adding a student, reset the form and navigate back
      if (!editing) {
        setStudentData({
          firstName: '',
          lastName: '',
          studentId: '',
          grade: '',
        });
      }

      // Redirect to the students page after submitting the form
      setEditing(false);
      setSelectedStudentId(null);
      navigate('/students');
    } catch (err) {
      setError('Error saving student');
      console.error('Error:', err);
    }
  };

  // Handling click on a student to edit
  const handleEdit = (student) => {
    setStudentData({
      firstName: student.firstName,
      lastName: student.lastName,
      studentId: student.studentId,
      grade: student.grade,
    });
    setEditing(true);
    setSelectedStudentId(student._id);
  };

  // Handle cancelling edit
  const handleCancel = () => {
    setEditing(false);
    setSelectedStudentId(null);
    setStudentData({
      firstName: '',
      lastName: '',
      studentId: '',
      grade: '',
    });
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div>
      <h1>Manage Students</h1>

      {/* Add or Edit Student Form */}
      <form onSubmit={handleSubmit}>
        <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={studentData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Student ID:
          <input
            type="text"
            name="studentId"
            value={studentData.studentId}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Grade:
          <input
            type="text"
            name="grade"
            value={studentData.grade}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{editing ? 'Update Student' : 'Add Student'}</button>
        {editing && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {/* List of Students */}
      <h2>All Students</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Grade</th>
            <th>Vaccinated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.studentId}</td>
              <td>{s.grade}</td>
              <td>{s.vaccinationStatus ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
