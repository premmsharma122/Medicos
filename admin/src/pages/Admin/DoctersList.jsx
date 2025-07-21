import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctersList = () => {
  const { docters, aToken, getAllDocters, changeAvailablity } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDocters();
    }
  }, [aToken]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>All Doctors</h1>
      <div style={styles.grid}>
        {docters.map((item, index) => (
          <div key={index} style={styles.card} className="doctor-card">
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.info}>
              <h2 style={styles.name}>{item.name}</h2>
              <p style={styles.speciality}>{item.speciality}</p>
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailablity(item._id)}
                />
                <label style={{ marginLeft: '0.5rem' }}>Available</label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .doctor-card {
          transition: background 0.3s ease, color 0.3s ease;
        }

        .doctor-card:hover {
          background-color: #007bff;
          color: white;
        }

        .doctor-card:hover h2,
        .doctor-card:hover p,
        .doctor-card:hover label {
          color: white;
        }

        @media (max-width: 768px) {
          .doctor-card {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .doctor-card {
            width: 100%;
          }

          .doctor-card img {
            height: 150px !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    padding: '1rem',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    marginTop: '1rem',
  },
  name: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  speciality: {
    color: '#555',
    marginBottom: '0.5rem',
  },
};

export default DoctersList;
