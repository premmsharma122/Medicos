import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDocter from './pages/Admin/AddDocter';
import DoctorList from './pages/Admin/DoctersList';

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer />
      {aToken ? (
        <div>
          <Navbar />
          {/* Layout for Sidebar + Content */}
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-docter" element={<AddDocter />} />
                <Route path="/docter-list" element={<DoctorList  />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
