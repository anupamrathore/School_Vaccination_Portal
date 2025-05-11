// src/pages/Drives.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drives = () => {
  const [date, setDate] = useState('');
  const [numberOfVaccines, setNumberOfVaccines] = useState('');
  const [message, setMessage] = useState('');
  const [drives, setDrives] = useState([]);

  // Fetch existing drives
  useEffect(() => {
    axios.get('http://localhost:5000/api/vaccination-drives')
      .then(res => setDrives(res.data))
      .catch(err => console.error('Error fetching drives:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/vaccination-drives', {
        date,
        numberOfVaccines: parseInt(numberOfVaccines)
      });

      setMessage('Vaccination drive scheduled successfully!');
      setDate('');
      setNumberOfVaccines('');

      // Update local list
      setDrives([...drives, res.data]);
    } catch (error) {
      console.error('Error creating drive:', error);
      setMessage('Error scheduling drive.');
    }
  };

  return (
    <div>
      <h2>Schedule a Vaccination Drive</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          Number of Vaccines:
          <input
            type="number"
            value={numberOfVaccines}
            onChange={e => setNumberOfVaccines(e.target.value)}
            required
            min="1"
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '20px' }}>Submit</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Upcoming Vaccination Drives</h3>
      <ul>
        {drives.map(drive => (
          <li key={drive._id}>
            {new Date(drive.date).toLocaleDateString()} — {drive.numberOfVaccines} doses ({drive.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drives;

