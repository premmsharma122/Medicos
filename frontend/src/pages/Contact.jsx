import React from 'react';
import contactimg from '../assets/contact_image.png';

const Contact = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          CONTACT <span style={{ color: '#007BFF' }}>US</span>
        </h2>
      </div>

      {/* Content */}
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
            src={contactimg}
            alt="Contact"
            style={{ width: '100%', maxWidth: '450px', borderRadius: '12px' }}
          />
        </div>

        {/* Contact Info */}
        <div
          style={{
            flex: '1 1 400px',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#333',
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ color: '#007BFF', marginBottom: '10px' }}>Our Office</h3>
          <p>281121 Vrindavan, Mathura</p>
          <p>Mob: <a href="tel:+919016000016" style={{ color: '#000' }}>+91 9016000016</a></p>

          <h4 style={{ marginTop: '30px', color: '#007BFF' }}>Careers at Medicos</h4>
          <p>Learn more about our team and job openings.</p>

          <button
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
