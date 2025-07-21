import React from 'react';
import AppointmentImg from '../assets/appointment_img.png';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate  = useNavigate()
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0056b3', // darker blue
    padding: '20px 30px',
    borderRadius: '10px',
    margin: '40px auto',
    maxWidth: '1000px',
    position: 'relative',
    overflow: 'visible',
    minHeight: '140px', // reduced height
  };

  const leftStyle = {
    flex: 1,
    zIndex: 1,
  };

  const headingStyle = {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: 'white',
  };

  const subheadingStyle = {
    fontSize: '24px',
    marginBottom: '14px',
    fontWeight: 'bold',
    color: 'white',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: 'white', // even darker on button
    color: 'grey',
    border: 'none',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    
    
  };

  const rightStyle = {
    flex: 1,
    textAlign: 'right',
    zIndex: 0,
  };

  const imageStyle = {
    width: '110%',
    maxWidth: '420px',
    marginRight: '-30px',
    marginTop: '-95px', // overlap more for bold look
  };

  return (
    <div style={containerStyle}>
      {/* Left Side */}
      <div style={leftStyle}>
        <p style={headingStyle}>Book Appointment</p>
        <p style={subheadingStyle}>With 50+ Trusted Doctors</p>
        <button onClick={()=>{navigate('/login');}} style={buttonStyle}>Create Account</button>
      </div>

      {/* Right Side */}
      <div style={rightStyle}>
        <img src={AppointmentImg} alt="Appointment" style={imageStyle} />
      </div>
    </div>
  );
};

export default Banner;
