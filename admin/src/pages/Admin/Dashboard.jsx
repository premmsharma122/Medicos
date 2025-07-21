import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <img src={assets.doctor_icon} alt="Doctors" style={styles.icon} />
          <div>
            <p style={styles.count}>{dashData.docters}</p>
            <p style={styles.label}>Doctors</p>
          </div>
        </div>

        <div style={styles.card}>
          <img src={assets.appointment_icon} alt="Appointments" style={styles.icon} />
          <div>
            <p style={styles.count}>{dashData.appointments}</p>
            <p style={styles.label}>Appointments</p>
          </div>
        </div>

        <div style={styles.card}>
          <img src={assets.patients_icon} alt="Patients" style={styles.icon} />
          <div>
            <p style={styles.count}>{dashData.patients}</p>
            <p style={styles.label}>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div style={styles.latestHeader}>
        <img src={assets.list_icon} alt="Latest Appointments" style={styles.icon} />
        <p style={styles.latestTitle}>Latest Appointments</p>
      </div>

      <div style={styles.appointmentsList}>
        {dashData.latestAppointments.map((item, index) => (
  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <img 
      src={(item.docData?.image) || 'https://placehold.co/100x100'} 
      alt="Doctor" 
      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginRight: '1rem' }}
    />
    <div>
      <p><strong>Doctor:</strong> {item.docData?.name || 'Unknown'}</p>
      <p><strong>Patient:</strong> {item.userData?.name || 'Unknown'}</p>
      <p><strong>Time:</strong> {item.date} {item.time}</p>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    gap: '1.5rem',
  },
  card: {
    flex: 1,
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#f0f8ff',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  icon: {
    width: '50px',
    height: '50px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '14px',
    color: '#666',
  },
  latestHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '0.5rem',
  },
  latestTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  appointmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  appointmentCard: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  appointmentImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
};

export default Dashboard;
