import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Docters from './pages/Docters';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import MyApponitments from './pages/MyApponitments'
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/doctors' element={<Docters/>} />
          <Route path='/doctors/:speciality' element={<Docters/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/my-profile' element={<Myprofile/>} />
          <Route path='/my-appointments' element={<MyApponitments/>} />
          <Route path='/appointment/:docId' element={<Appointment/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
