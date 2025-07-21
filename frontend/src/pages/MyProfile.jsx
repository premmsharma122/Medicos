// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import profile_pic from "../assets/profile_pic.png";

// const Myprofile = () => {
//   const { userData, setUserData, token, backendUrl } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(null);

//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("✅ Profile API Response:", data); // 🔍 Check this log
//       if (data.success) {
//         setUserData(data.user); // OR data.userData — depends on backend
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log("❌ Error fetching profile:", error);
//       toast.error(error?.response?.data?.message || "Error loading profile.");
//     }
//   };

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", JSON.stringify(userData.address));
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);
//       if (image) formData.append("image", image);

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/update-profile`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(null);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUserData((prev) => ({
//           ...prev,
//           image: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     if (!userData) {
//       loadUserProfileData();
//     }
//   }, []);

//   if (!userData) {
//     return <p style={{ textAlign: "center" }}>Loading your profile...</p>;
//   }

//   const styles = {
//     container: {
//       maxWidth: "600px",
//       margin: "40px auto",
//       padding: "30px",
//       background: "#ffffff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//       fontFamily: "Segoe UI, sans-serif",
//       color: "#333",
//     },
//     sectionTitle: {
//       fontSize: "18px",
//       margin: "20px 0 10px",
//       fontWeight: "bold",
//       color: "#2c3e50",
//       borderBottom: "1px solid #ddd",
//       paddingBottom: "5px",
//     },
//     input: {
//       width: "100%",
//       padding: "8px 12px",
//       margin: "6px 0 12px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "15px",
//     },
//     label: {
//       fontWeight: "bold",
//       marginTop: "12px",
//     },
//     button: {
//       padding: "10px 20px",
//       backgroundColor: "#3498db",
//       border: "none",
//       color: "white",
//       borderRadius: "6px",
//       cursor: "pointer",
//       marginTop: "20px",
//       fontSize: "15px",
//     },
//     image: {
//       width: "100px",
//       height: "100px",
//       borderRadius: "50%",
//       objectFit: "cover",
//       display: "block",
//       margin: "0 auto 20px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {/* <img src={userData.image} alt="Profile" style={styles.image} /> */}
//       <img
//         src={
//           userData?.image && userData.image.trim() !== ""
//             ? userData.image
//             : profile_pic
//         }
//         alt="Profile"
//         style={styles.image}
//       />

//       {isEdit && (
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ fontSize: "14px" }}
//           />
//         </div>
//       )}

//       {isEdit ? (
//         <input
//           style={styles.input}
//           type="text"
//           value={userData.name}
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, name: e.target.value }))
//           }
//         />
//       ) : (
//         <h2 style={{ textAlign: "center" }}>{userData.name}</h2>
//       )}

//       <div>
//         <p style={styles.sectionTitle}>Contact Information</p>

//         <p style={styles.label}>Email:</p>
//         <p>{userData.email}</p>

//         <p style={styles.label}>Phone:</p>
//         {isEdit ? (
//           <input
//             style={styles.input}
//             type="text"
//             value={userData.phone}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, phone: e.target.value }))
//             }
//           />
//         ) : (
//           <p>{userData.phone}</p>
//         )}

//         <p style={styles.label}>Address:</p>
//         {isEdit ? (
//           <>
//             <input
//               style={styles.input}
//               type="text"
//               value={userData.address?.line1 || ""}
//               onChange={(e) =>
//                 setUserData((prev) => ({
//                   ...prev,
//                   address: { ...prev.address, line1: e.target.value },
//                 }))
//               }
//             />
//             <input
//               style={styles.input}
//               type="text"
//               value={userData.address?.line2 || ""}
//               onChange={(e) =>
//                 setUserData((prev) => ({
//                   ...prev,
//                   address: { ...prev.address, line2: e.target.value },
//                 }))
//               }
//             />
//           </>
//         ) : (
//           <p>
//             {userData.address?.line1}
//             <br />
//             {userData.address?.line2}
//           </p>
//         )}
//       </div>

//       <div>
//         <p style={styles.sectionTitle}>Basic Information</p>

//         <p style={styles.label}>Gender:</p>
//         {isEdit ? (
//           <select
//             style={styles.input}
//             value={userData.gender}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, gender: e.target.value }))
//             }
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         ) : (
//           <p>{userData.gender}</p>
//         )}

//         <p style={styles.label}>Birthday:</p>
//         {isEdit ? (
//           <input
//             style={styles.input}
//             type="date"
//             value={userData.dob}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, dob: e.target.value }))
//             }
//           />
//         ) : (
//           <p>{userData.dob}</p>
//         )}
//       </div>

//       <div style={{ textAlign: "center" }}>
//         {isEdit ? (
//           <button style={styles.button} onClick={updateUserProfileData}>
//             Save Information
//           </button>
//         ) : (
//           <button style={styles.button} onClick={() => setIsEdit(true)}>
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Myprofile;
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import profile_pic from "../assets/profile_pic.png";

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("❌ Error fetching profile:", error);
      toast.error(error?.response?.data?.message || "Error loading profile.");
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!userData) {
      loadUserProfileData();
    }
  }, []);

  if (!userData) {
    return <p style={{ textAlign: "center" }}>Loading your profile...</p>;
  }

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      fontFamily: "Segoe UI, sans-serif",
      color: "#333",
    },
    sectionTitle: {
      fontSize: "18px",
      margin: "20px 0 10px",
      fontWeight: "bold",
      color: "#2c3e50",
      borderBottom: "1px solid #ddd",
      paddingBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      margin: "6px 0 12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "15px",
    },
    label: {
      fontWeight: "bold",
      marginTop: "12px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#3498db",
      border: "none",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "20px",
      fontSize: "15px",
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      display: "block",
      margin: "0 auto 20px",
    },
  };

  const getProfileImage = () => {
    return userData?.image && userData.image.trim() !== ""
      ? userData.image
      : profile_pic;
  };

  return (
    <div style={styles.container}>
      <img
        src={getProfileImage()}
        alt="Profile"
        style={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = profile_pic;
        }}
      />

      {isEdit && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ fontSize: "14px" }}
          />
        </div>
      )}

      {isEdit ? (
        <input
          style={styles.input}
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <h2 style={{ textAlign: "center" }}>{userData.name}</h2>
      )}

      <div>
        <p style={styles.sectionTitle}>Contact Information</p>

        <p style={styles.label}>Email:</p>
        <p>{userData.email}</p>

        <p style={styles.label}>Phone:</p>
        {isEdit ? (
          <input
            style={styles.input}
            type="text"
            value={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p>{userData.phone}</p>
        )}

        <p style={styles.label}>Address:</p>
        {isEdit ? (
          <>
            <input
              style={styles.input}
              type="text"
              value={userData.address?.line1 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              style={styles.input}
              type="text"
              value={userData.address?.line2 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </>
        ) : (
          <p>
            {userData.address?.line1}
            <br />
            {userData.address?.line2}
          </p>
        )}
      </div>

      <div>
        <p style={styles.sectionTitle}>Basic Information</p>

        <p style={styles.label}>Gender:</p>
        {isEdit ? (
          <select
            style={styles.input}
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}

        <p style={styles.label}>Birthday:</p>
        {isEdit ? (
          <input
            style={styles.input}
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p>{userData.dob}</p>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        {isEdit ? (
          <button style={styles.button} onClick={updateUserProfileData}>
            Save Information
          </button>
        ) : (
          <button style={styles.button} onClick={() => setIsEdit(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
