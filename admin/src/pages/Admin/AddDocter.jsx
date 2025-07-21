import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [fees, setFees] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) return toast.error('Doctor image is required!');
    if (!name || !email || !password || !experience || !speciality || !degree || !fees || !about || !address1) {
      return toast.error('Please fill all required fields!');
    }

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('speciality', speciality);
      formData.append('education', degree);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        toast.success(data.message || 'Doctor added successfully!');
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setSpeciality('General Physician');
        setDegree('');
        setFees('');
        setAbout('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message || 'Failed to add doctor');
      }
    } catch (error) {
      console.error('Add Doctor Error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong!');

    }
  };

  const styles = {
    container: {
      padding: '10px 30px',
      paddingLeft: '250px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    form: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
    },
    uploadSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px',
    },
    labelImg: {
      cursor: 'pointer',
    },
    row: {
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
      marginBottom: '30px',
    },
    column: {
      flex: 1,
      minWidth: '300px',
    },
    field: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '6px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      resize: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#1976d2',
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={onSubmitHandler}>
        <h2 style={styles.heading}>Add Doctor</h2>

        <div style={styles.uploadSection}>
          <label htmlFor="doc-img" style={styles.labelImg}>
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Doctor"
              width="80"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload doctor picture</p>
        </div>

        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.field}>
              <label style={styles.label}>Doctor Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder="Name" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Experience</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} style={styles.select}>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((yr) => (
                  <option key={yr} value={`${yr} Year`}>{yr} Year</option>
                ))}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Fees</label>
              <input value={fees} onChange={(e) => setFees(e.target.value)} type="number" required placeholder="Fees" style={styles.input} />
            </div>
          </div>

          <div style={styles.column}>
            <div style={styles.field}>
              <label style={styles.label}>Speciality</label>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} style={styles.select}>
                {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Education</label>
              <input value={degree} onChange={(e) => setDegree(e.target.value)} type="text" required placeholder="Degree / Qualification" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Address Line 1</label>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" required placeholder="Address Line 1" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Address Line 2</label>
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" placeholder="Address Line 2" style={styles.input} />
            </div>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            rows={5}
            placeholder="Write about doctor"
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.button}>Add Doctor</button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddDoctor;
