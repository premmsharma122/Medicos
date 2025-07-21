import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { specialityData } from '../assets/assets';

const Docters = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const { doctors } = useContext(AppContext);

  const matched = specialityData.find((s) => s.slug === speciality);
  const selectedSpeciality = matched ? matched.speciality : null;

  useEffect(() => {
    if (doctors.length === 0) return; // ✅ Wait until doctors are loaded

    if (selectedSpeciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === selectedSpeciality));
    } else {
      setFilterDoc(doctors);
    }

    setLoading(false); // ✅ Done loading
  }, [doctors, selectedSpeciality]);

  const sidebarItemStyle = (isActive) => ({
    marginBottom: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: isActive ? '#d0e8ff' : 'transparent',
    color: isActive ? '#0056b3' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'background-color 0.2s ease',
  });

  const doctorCardStyle = {
    width: '220px',
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const hoverEffect = {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '30px' }}>
      {/* Sidebar */}
      <div style={{ width: '220px' }}>
        <h3>Filter by Speciality</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li
            style={sidebarItemStyle(!speciality)}
            onClick={() => navigate('/docters')}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = !speciality ? '#e0f0ff' : 'transparent')
            }
          >
            All
          </li>
          {specialityData.map((item) => (
            <li
              key={item.slug}
              style={sidebarItemStyle(speciality === item.slug)}
              onClick={() => navigate(`/docters/${item.slug}`)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => {
                if (speciality !== item.slug) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item.speciality}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Cards */}
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '10px' }}>
          {selectedSpeciality ? `Doctors specialized in "${selectedSpeciality}"` : 'All Available Doctors'}
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {loading ? (
            <p>Loading doctors...</p>
          ) : filterDoc.length > 0 ? (
            filterDoc.map((doc, index) => (
              <div
                key={doc._id}
                style={{
                  ...doctorCardStyle,
                  ...(hoveredIndex === index ? hoverEffect : {}),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(`/appointment/${doc._id}`)}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
                <h4 style={{ marginTop: '10px' }}>{doc.name}</h4>
                <p>{doc.speciality}</p>
                <p>{doc.degree} • {doc.experience}</p>
                <p><strong>₹{doc.fees}</strong></p>
              </div>
            ))
          ) : (
            <p>No doctors found for selected speciality.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Docters;
