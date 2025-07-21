import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedDocters = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const related = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(related);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <div style={{ marginTop: '50px' }}>
      <h3 style={{ marginBottom: '16px' }}>Related Doctors</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {relDoc.map((doc) => (
          <Link
            to={`/appointment/${doc._id}`}
            key={doc._id}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: '220px',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
              transition: '0.2s',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={doc.image}
                alt={doc.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px',
                }}
              />
              <h4 style={{ margin: '6px 0' }}>{doc.name}</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {doc.degree} - {doc.speciality}
              </p>
              <p style={{ fontSize: '14px', color: '#333', marginTop: '6px' }}>
                Fee: ₹{doc.fees}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedDocters;
