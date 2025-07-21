import React, { useState } from 'react';
import groupPhoto from '../assets/group_profiles.png';
import arrowimg from '../assets/arrow_icon.svg';
import headerimg from '../assets/header_img.png';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Responsive container with padding and rounded corners
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
    flexWrap: 'wrap',
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    padding: '24px',
    gap: '24px',
  };

  // Left section styling
  const leftSideStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '40px 0',
    margin: 'auto',
  };

  // Right section (image) styling
  const rightSideContainerStyle = {
    flex: 1,
    position: window.innerWidth >= 768 ? 'absolute' : 'relative',
    bottom: window.innerWidth >= 768 ? '0' : 'auto',
    right: window.innerWidth >= 768 ? '24px' : 'auto',
    width: window.innerWidth >= 768 ? '50%' : '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  };

  const headerImageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    maxWidth: '480px',
  };

  // Typography styles
  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px',
  };

  const subtitleStyle = {
    color: '#555',
    lineHeight: '1.6',
  };

  // Hoverable button style
  const buttonLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: isHovered ? '#0056b3' : '#007BFF', // darkens on hover
    color: 'white',
    padding: '10px 18px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
    gap: '8px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      {/* Left Side */}
      <div style={leftSideStyle}>
        <p style={titleStyle}>
          Book Appointments <br /> with Trusted Doctors
        </p>
        <img src={groupPhoto} alt="Group" style={{ width: '180px' }} />
        <p style={subtitleStyle}>
          Simply browse through our extensive list of trusted doctors and get the care you need.
        </p>

        <a
          href="#speciality"
          style={buttonLinkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Book Appointment <img src={arrowimg} alt="arrow" style={{ width: '20px' }} />
        </a>
      </div>

      {/* Right Side */}
      <div style={rightSideContainerStyle}>
        <img src={headerimg} alt="Header" style={headerImageStyle} />
      </div>
    </div>
  );
};

export default Header;
