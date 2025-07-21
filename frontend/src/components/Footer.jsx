import React from 'react';

const Footer = () => {
  const footerContainer = {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px', // Reduced padding
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderTop: '1px solid #ccc',
  };

  const sectionStyle = {
    flex: '1 1 200px',
    margin: '5px 10px',        // Smaller margins
    lineHeight: '1.4',         // Tighter line height
    fontSize: '16px',          // Increased font size
    color: '#333',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    marginBottom: '4px',       // Less spacing between list items
  };

  const headingStyle = {
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '17px',
  };

  const copyrightStyle = {
    textAlign: 'center',
    padding: '10px 0 5px',
    backgroundColor: '#f1f1f1',
    fontSize: '14px',
    color: '#555',
    marginTop: '10px',
  };

  return (
    <div>
      <div style={footerContainer}>
        {/* Left Section */}
        <div style={sectionStyle}>
          <p>
            Medicos offers quality healthcare and expert consultation with modern facilities.
          </p>
        </div>

        {/* Center Section */}
        <div style={sectionStyle}>
          <p style={headingStyle}>COMPANY</p>
          <ul style={listStyle}>
            <li style={listItemStyle}>Home</li>
            <li style={listItemStyle}>About Us</li>
            <li style={listItemStyle}>Contact</li>
            <li style={listItemStyle}>Privacy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div style={sectionStyle}>
          <p style={headingStyle}>GET IN TOUCH</p>
          <ul style={listStyle}>
            <li style={listItemStyle}>+91-9016000016</li>
            <li style={listItemStyle}>premmdevloper@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={copyrightStyle}>
        <hr style={{ margin: '0 auto 8px', width: '90%', borderColor: '#ccc' }} />
        <p>© 2025 Medicos — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
