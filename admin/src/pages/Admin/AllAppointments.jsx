import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments } = useContext(AdminContext);
  const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return 'N/A';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Appointments</h2>

      <div style={styles.gridHeader}>
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      {appointments.map((item, index) => (
        <div key={index} style={styles.gridRow}>
          <p>{index + 1}</p>

          <div style={styles.profile}>
            <img
              src={item.userData?.image}
              alt="patient"
              style={styles.img}
            />
            <span>{item.userData?.name || 'N/A'}</span>
          </div>

         <p>{calculateAge(item.userData?.dob)}</p>

          <p>{new Date(item.date).toLocaleString()}</p>

          <div style={styles.profile}>
            <img
              src={item.docData?.image}
              alt="doctor"
              style={styles.img}
            />
            <span>{item.docData?.name || 'N/A'}</span>
          </div>

          <p>₹{item.amount || 'N/A'}</p>
          <button style={styles.btn}>View</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '16px',
    fontSize: '24px',
    color: '#333',
  },
  gridHeader: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 60px 180px 1fr 80px 100px',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    padding: '10px',
    borderBottom: '2px solid #ccc',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 60px 180px 1fr 80px 100px',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  img: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #ccc',
  },
  btn: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AllAppointments;
