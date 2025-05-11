import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [vaccinatedStudents, setVaccinatedStudents] = useState([]);
  const [vaccinationDrives, setVaccinationDrives] = useState([]);
  const navigate = useNavigate();

  // Fetch all students, vaccinated students and vaccination drives
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all students
        const studentResponse = await axios.get('http://localhost:5000/api/students');
        setStudents(studentResponse.data);

        // Filter vaccinated students
        const vaccinated = studentResponse.data.filter(student => student.vaccinationStatus === true);
        setVaccinatedStudents(vaccinated);

        // Fetch upcoming vaccination drives
        const driveResponse = await axios.get('http://localhost:5000/api/vaccination-drives');
        setVaccinationDrives(driveResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };



  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>MAIN MENU</h2>
        <button onClick={() => navigate('/students')}>Student Management</button>
        <button onClick={() => navigate('/drives')}>Vaccine Drives</button>
        <button onClick={() => navigate('/reports')}>Reports</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <h1>School Vaccination Portal</h1>
        <div className="stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>
          <div className="stat-card">
            <h3>Vaccinated Students</h3>
            <p>{vaccinatedStudents.length}</p>
          </div>
        </div>

        <h2>Upcoming Vaccination Drives</h2>
        <div className="drive-list">
          {vaccinationDrives.length > 0 ? vaccinationDrives.map((drive, index) => (
            <div key={index} className="drive-card">
              <h4>{drive.vaccineName}</h4>
              <p><strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}</p>
              <p><strong>Slots:</strong> {drive.availableSlots}</p>
              <p><strong>Grades:</strong> {drive.appliedClasses.join(', ')}</p>
            </div>
          )) : <p>No upcoming drives</p>}
        </div>

        {/* Optional School Icon */}
        <div className="school-image">
          <img src="/images/school.png" alt="School" /> {/* You can put a school image in public/images */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
