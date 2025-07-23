import { createContext, useState , useCallback} from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { set } from "mongoose";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  );
  const [docters, setDocters] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = "https://medicos-scwl.onrender.com/";

 const getAllDocters = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + '/api/admin/all-docters',
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      setDocters(data.docters);  // ✅ FIXED HERE
      console.log("Docters fetched successfully:", data.docters);  // ✅ FIXED HERE
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Fetch failed: ' + error.message);
    console.error(error);
  }
};

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availablity',
        { docId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDocters(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/admin/appointments',
        {
          headers: {  //add as bearer token
            Authorization: `Bearer ${aToken}`,  
          },
        }
      );
      if (data.success) {   
        setAppointments(data.appointments);
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error('Fetch failed: ' + error.message);
      console.error(error);
    }
  }
 const getDashData = useCallback(async () => {
  try {
    const { data } = await axios.get(
      backendUrl + '/api/admin/dashboard',
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );
    if (data.success) {
      setDashData(data.dashData);
      console.log("Dashboard data fetched successfully:", data.dashData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Fetch failed: ' + error.message);
    console.error(error);
  }
}, [aToken, backendUrl]); // dependency on token and URL
  const value = {
  aToken, setAToken,
  backendUrl, docters,
  getAllDocters, changeAvailablity,
  appointments, setAppointments,
  getAllAppointments, 
  dashData, getDashData
};


  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
