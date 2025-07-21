import React from 'react';
import aboutimg from '../assets/about_image.png';

const About = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          ABOUT <span style={{ color: '#007BFF' }}>US</span>
        </h2>
      </div>

      {/* Content Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Image */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <img
            src={aboutimg}
            alt="About Us"
            style={{ width: '100%', maxWidth: '450px', borderRadius: '12px' }}
          />
        </div>

        {/* Text Content */}
        <div style={{ flex: '1 1 500px', fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
          <p>
            Welcome to <strong>Medicos</strong>, your trusted platform for connecting with experienced and certified healthcare professionals across all specializations. At Medicos, we believe that accessing quality medical care should be simple, fast, and transparent. Whether you're looking for a general physician for a routine check-up or a specialist for expert advice, we’re here to guide you every step of the way.
          </p>

          <p>
            Our mission is to bridge the gap between patients and doctors by providing a seamless booking experience and verified information at your fingertips. Each doctor listed on Medicos is carefully vetted, and we provide detailed profiles including their qualifications, experience, fees, and availability—so you can make informed decisions about your health without stress or confusion.
          </p>

          <h3 style={{ marginTop: '20px', color: '#007BFF' }}>Our Vision</h3>
          <p>
            At Medicos, we’re more than just a booking service—we’re your health companion. Our platform ensures privacy, prompt support, and a patient-first approach to care. Whether you're at home or on the go, Medicos empowers you to take control of your healthcare journey with confidence and convenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
