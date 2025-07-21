import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: 'white',
      boxShadow: '0 4px 8px rgba(119, 127, 213, 0.17)',
    },
    roleText: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#e53935',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#d32f2f',
    },
  };

  return (
    <div style={styles.navbar}>
      <p style={styles.roleText}>{aToken ? 'Admin' : 'Docter'}</p>
      <button
        style={styles.button}
        onClick={logout}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
