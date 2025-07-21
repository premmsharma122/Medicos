import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div style={styles.sidebarContainer}>
      {aToken && (
        <ul style={styles.navList}>
          <li>
            <NavLink to="/admin-dashboard" style={navLinkStyles}>
              <img src={assets.home_icon} alt="Home" style={styles.iconStyle} />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-appointments" style={navLinkStyles}>
              <img src={assets.appointment_icon} alt="Appointments" style={styles.iconStyle} />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-docter" style={navLinkStyles}>
              <img src={assets.add_icon} alt="Add Doctor" style={styles.iconStyle} />
              <p>Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/docter-list" style={navLinkStyles}>
              <img src={assets.people_icon} alt="Doctors List" style={styles.iconStyle} />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

const styles = {
  sidebarContainer: {
    width: '250px',
    minHeight: '100vh',
    backgroundColor: '#fff',
    borderRight: '1px solid #ddd',
    paddingTop: '20px',
    boxSizing: 'border-box',
  },
  navList: {
    listStyle: 'none',
    padding: '0 10px',
    margin: 0,
  },
  iconStyle: {
    width: '20px',
    height: '20px',
  }
};

// 👇 Styled dynamically using NavLink's isActive
const navLinkStyles = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 15px',
  marginBottom: '10px',
  textDecoration: 'none',
  color: isActive ? 'white' : '#333',
  backgroundColor: isActive ? '#1976d2' : 'transparent',
  borderRadius: '8px',
  fontWeight: isActive ? 'bold' : 'normal',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
  width: '100%',
  boxSizing: 'border-box',
  ...(isActive
    ? {}
    : {
        // Hover effect only if not active
        ':hover': {
          backgroundColor: '#e3f2fd',
        },
      }),
});

export default Sidebar;
