import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
// import logo from '../assets/medicos_logo.png'; // Replace with actual logo path
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (state === 'Sign Up') {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Registration successful');
        setState('Login'); // Optional: switch to login screen
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Login successful');
      } else {
        toast.error(data.message || 'Login failed');
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
        padding: '20px',
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          padding: '40px 30px',
          borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
          textAlign: 'center',
        }}
      >
      <div
  style={{
    background: 'linear-gradient(to right, #ffffff, #e0f0ff)', // white to bluish
    padding: '40px 20px',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    fontFamily: `'Poppins', 'Segoe UI', sans-serif`, // attractive modern font
  }}
>
  <h1
    style={{
      fontSize: '42px',
      background: 'linear-gradient(to right, #007BFF, #00C6FF)', // gradient text
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '700',
      letterSpacing: '1px',
      margin: 0,
    }}
  >
    Medicos
  </h1>
</div>


        {/* Heading */}
        <h2 style={{ marginBottom: '8px' }}>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
        </p>

        {/* Name Field (Only in Sign Up) */}
        {state === 'Sign Up' && (
          <div style={{ textAlign: 'left', marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your full name"
              style={inputStyle}
            />
          </div>
        )}

        {/* Email Field */}
        <div style={{ textAlign: 'left', marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
            style={inputStyle}
          />
        </div>

        {/* Password Field */}
        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
            style={inputStyle}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Switch State */}
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                style={{ color: '#007BFF', cursor: 'pointer', fontWeight: '500' }}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                style={{ color: '#007BFF', cursor: 'pointer', fontWeight: '500' }}
              >
                Sign up now
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

// Input style
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginTop: '6px',
  fontSize: '15px',
  outline: 'none',
};

export default Login;
