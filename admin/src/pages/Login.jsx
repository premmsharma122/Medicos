import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import {toast} from 'react-toastify'


const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setAToken, backendUrl} = useContext(AdminContext)

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    if (state === 'Admin') {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

    //   console.log('Response:', data); // ✅ Now safe to use

      if (data.success) {
        localStorage.setItem('aToken', data.token)
        setAToken(data.token);
      }else{
        toast.error(data.message)
      }
    }
  } catch (error) {
    console.log('Login error:', error.response?.data || error.message);
  }
};



  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd, #f5f5f5)',
    },
    box: {
      backgroundColor: 'white',
      padding: '40px 30px',
      borderRadius: '12px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
      width: '350px',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '24px',
      fontSize: '24px',
      color: '#333',
    },
    inputGroup: {
      textAlign: 'left',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '5px',
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #bbb',
      borderRadius: '6px',
      fontSize: '14px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#1976d2',
      color: 'white',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#155ca4',
    },
    toggleText: {
      marginTop: '15px',
      fontSize: '14px',
      color: '#666',
    },
    toggleLink: {
      color: '#1976d2',
      fontWeight: '600',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.box} onSubmit={onSubmit}>
        <h2 style={styles.heading}>{state} Login</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.toggleText}>
          {state === 'Admin' ? 'Doctor Login?' : 'Admin Login?'}{' '}
          <span
            style={styles.toggleLink}
            onClick={() => setState(state === 'Admin' ? 'Docter' : 'Admin')}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
