import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDocters = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // ✅ Fixed variable name from docters → doctors
  const { doctors } = useContext(AppContext);

  const containerStyle = {
    textAlign: 'center',
    padding: '40px 20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '30px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  };

  const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '12px',
  };

  const moreButtonStyle = {
    marginTop: '40px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const moreButtonHoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'translateY(-2px)',
  };

  return (
    <div style={containerStyle}>
      <h1>Top Doctors to Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>

      <div style={gridStyle}>
        {doctors.slice(0, 10).map((doc, index) => (
          <div
            key={doc._id}
            style={{
              ...cardStyle,
              ...(hoveredIndex === index ? cardHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => navigate(`/appointment/${doc._id}`)}
          >
            <img src={doc.image} alt={doc.name} style={imgStyle} />

            <h3 style={{
              fontFamily: `'Segoe UI', 'Arial Rounded MT Bold', 'Arial', sans-serif`,
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '6px',
              color: '#333'
            }}>
              {doc.name}
            </h3>

            <p style={{
              fontSize: '0.95rem',
              color: '#555',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              {doc.speciality}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: doc.available ? '#28a745' : '#dc3545',
                border: '2px solid ' + (doc.available ? '#28a745' : '#dc3545'),
              }}></div>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: doc.available ? '#28a745' : '#dc3545'
              }}>
                {doc.available ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => navigate('/doctors')}  // ✅ ensure this matches your actual route
          style={{
            ...moreButtonStyle,
            ...(isHovered ? moreButtonHoverStyle : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDocters;
