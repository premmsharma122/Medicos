import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getDoctorsData();
    }
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Appointments</h2>
      <div style={styles.cardContainer}>
       {Array.isArray(appointments) && appointments.map((item, index) => {

          const doctor = doctors?.find((d) => d._id === item.docId);

          return (
            <div key={index} style={styles.card}>
              <img 
                src={doctor?.image || 'https://placehold.co/150x140?text=No+Image'} 
                alt={doctor?.name || 'Doctor'} 
                style={styles.image} 
              />

              <div style={styles.details}>
                <h3 style={styles.name}>{doctor?.name || 'Doctor Name'}</h3>
                <p style={styles.speciality}>{doctor?.speciality || 'Speciality'}</p>

                <p style={styles.addressLabel}>Address:</p>
                <p style={styles.address}>{doctor?.address?.line1 || 'Line 1 missing'}</p>
                <p style={styles.address}>{doctor?.address?.line2 || 'Line 2 missing'}</p>

                <p style={styles.datetime}>
                  <span style={{ fontWeight: 'bold' }}>Date & Time:</span>{' '}
                  {new Date(item.slotDate).toLocaleDateString("en-GB")} | {item.slotTime}
                </p>

                <div style={styles.buttonGroup}>
                  {!item.cancelled && (
                    <>
                      <button style={styles.payBtn}>Pay Online</button>
                      <button onClick={() => cancelAppointment(item._id)} style={styles.cancelBtn}>
                        Cancel Appointment
                      </button>
                    </>
                  )}
                  {item.cancelled && (
                    <button style={styles.cancelBtn}>Appointment Cancelled</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '26px',
    marginBottom: '30px',
    color: '#2c3e50',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    overflow: 'hidden',
  },
  image: {
    width: '160px',
    height: '140px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    backgroundColor: '#f0f0f0',
    flexShrink: 0,
  },
  details: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    margin: '0 0 6px',
    fontSize: '20px',
    color: '#2c3e50',
  },
  speciality: {
    margin: '0 0 12px',
    fontSize: '15px',
    color: '#555',
  },
  addressLabel: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  address: {
    margin: '2px 0',
    color: '#333',
  },
  datetime: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#444',
  },
  buttonGroup: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    flexWrap: 'wrap',
  },
  payBtn: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '120px',
  },
  cancelBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '150px',
  },
};

export default MyAppointments;
