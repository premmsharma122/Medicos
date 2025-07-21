import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import docterModel from '../models/docterModel.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; 
import appointmentModel from '../models/appointmentModel.js';
const addDocter = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      about,
      fees,
      address,
      education, // coming from frontend as `education`
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (
      !name || !email || !password || !speciality || !education ||
      !experience || !about || !fees || !address || !imageFile
    ) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
    }

    // Password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      });
    }

    // Check existing doctor
    const existingDoc = await docterModel.findOne({ email });
    if (existingDoc) {
      return res.status(409).json({
        success: false,
        message: 'Doctor already exists with this email.',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });

    const imageUrl = imageUpload.secure_url;

    // Save new doctor
    const newDoctor = new docterModel({
      name,
      email,
      password: hashPassword,
      image: imageUrl,
      speciality,
      degree: education, // map `education` to `degree`
      experience,
      about,
      fees,
      address: typeof address === 'string' ? JSON.parse(address) : address,
      date: Date.now(),
    });

    await newDoctor.save();

    res.status(201).json({ success: true, message: 'Doctor added successfully.' });

  } catch (error) {
    console.error('Add Doctor Error:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all docters list for admin pannel
const allDocters = async  (req,res) =>{
  try {
    const docters = await docterModel.find({}).select('-password')
    res.json({success:true, docters})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
// Api to get all appointments list for admin pannel
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ createdAt: -1 });

    console.log("Raw Appointments:", appointments.map(a => ({
      id: a._id,
      docId: a.docId,
      userId: a.userId,
    })));

//     const enrichedAppointments = await Promise.all(
//       appointments.map(async (appt) => {
//         const user = appt.userId ? await userModel.findById(appt.userId) : null;
//         const doctor = appt.doctorId ? await docterModel.findById(appt.doctorId) : null;

//        return {
//   ...appt._doc,
//   userData: user
//     ? {
//         name: user.name || 'N/A',
//         dob: user.dob || null,  // ✅ pass DOB to frontend
//         image: user.image || 'https://placehold.co/100x100',
//       }
//     : { name: 'N/A', dob: null, image: 'https://placehold.co/100x100' },

//   docData: doctor
//     ? {
//         name: doctor.name || 'N/A',
//         image: doctor.image || 'https://placehold.co/100x100',
//       }
//     : { name: 'N/A', image: 'https://placehold.co/100x100' },
// };

//       })
//     );
const enrichedAppointments = await Promise.all(
  appointments.map(async (appt) => {
    const user = appt.userId ? await userModel.findById(appt.userId) : null;
    const doctor = appt.docId ? await docterModel.findById(appt.docId) : null;

    return {
      ...appt._doc,
      userData: user
        ? {
            name: user.name || 'N/A',
            dob: user.dob || null,
            image: user.image || 'https://placehold.co/100x100',
          }
        : { name: 'N/A', dob: null, image: 'https://placehold.co/100x100' },

      docData: doctor
        ? {
            name: doctor.name || 'N/A',
            image: doctor.image || 'https://placehold.co/100x100',
          }
        : { name: 'N/A', image: 'https://placehold.co/100x100' },
    };
  })
);

    console.log("Enriched Appointments:", enrichedAppointments);

    res.json({ success: true, appointments: enrichedAppointments });
  } catch (error) {
    console.log('appointmentsAdmin error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Api to get dashboard data for admin pannel
const adminDashboard = async (req, res) => {
  try {
    const docters = await docterModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      docters: docters.length,
      users: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.slice(-5).reverse(),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

export { addDocter, loginAdmin , allDocters, appointmentsAdmin, adminDashboard };
