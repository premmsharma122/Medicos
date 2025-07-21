import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      style={{
        padding: '40px 20px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>Find by Speciality</h1>
      <p
        style={{
          maxWidth: '600px',
          marginBottom: '32px',
          color: '#555',
        }}
      >
        Simply browse through our extensive list of trusted doctors, schedule your appointments hassle-free.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
        }}
      >
        {specialityData.map((item, index) => (
          // <Link
          //   key={index}
          //   to={`/docters/${item.speciality}`}
          //   style={{ textDecoration: 'none', color: 'black' }}
          // >
          //   <div style={{ textAlign: 'center' }}>
          //     <img
          //       src={item.image}
          //       alt={item.speciality}
          //       style={{ width: '80px', height: '80px', marginBottom: '8px' }}
          //     />
          //     <p>{item.speciality}</p>
          //   </div>
          // </Link>
          <Link
  key={index}
  to={`/docters/${item.slug}`}
  style={{ textDecoration: 'none', color: 'black' }}
>
  <div style={{ textAlign: 'center' }}>
    <img src={item.image} alt={item.speciality} style={{ width: '80px', height: '80px', marginBottom: '8px' }} />
    <p>{item.speciality}</p>
  </div>
</Link>

        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
