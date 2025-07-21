import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import docterModel from '../models/docterModel.js';
import appointmentModel from '../models/appointmentModel.js';

const formatDateKey = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}_${month}_${year}`;
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updateData = {
      name,
      phone,
      address: typeof address === 'string' ? JSON.parse(address) : address,
      dob,
      gender,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const bookAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { docId, slotDate, slotTime } = req.body;

//     // Convert slotDate to a Date object
//     const dateObj = new Date(slotDate);

//     if (isNaN(dateObj.getTime())) {
//       return res.status(400).json({ success: false, message: "Invalid slotDate format" });
//     }

//     // Format dateKey for booking logic (dd_mm_yyyy)
//     const dateKey = `${dateObj.getDate()}_${dateObj.getMonth() + 1}_${dateObj.getFullYear()}`;

//     // Save as ISO string "YYYY-MM-DD" for consistent frontend display
//     const isoDate = dateObj.toISOString().split('T')[0];

//     const doctor = await docterModel.findById(docId);
//     if (!doctor || !doctor.available) {
//       return res.status(400).json({ success: false, message: "Doctor not available" });
//     }

//     const bookedTimes = doctor.slots_booked.get(dateKey) || [];

//     if (bookedTimes.includes(slotTime)) {
//       return res.status(409).json({ success: false, message: "Slot already booked" });
//     }

//     // Add this time to the doctor's booked list
//     bookedTimes.push(slotTime);
//     doctor.slots_booked.set(dateKey, bookedTimes);

//     // Get full user and doctor data for storing inside appointment
//     const userData = await userModel.findById(userId).select('-password');
//     const docData = await docterModel.findById(docId).select('-password -slots_booked');

//    const newAppointment = new appointmentModel({
//   userId,
//   docId,
//   slotDate: isoDate,
//   slotTime,
//   amount: docData.fees,
//   date: Date.now(),
//   userData: {
//     name: userData.name,
//     image: userData.image || '',
//     dob: userData.dob || '',
//   },
//   docData: {
//     name: docData.name,
//     image: docData.image || '',
//   }
// });

//     await newAppointment.save();

//     doctor.markModified('slots_booked');
//     await doctor.save();

//     res.json({ success: true, message: "Appointment booked successfully!" });

//   } catch (error) {
//     console.log("Appointment booking error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// const bookAppointment = async (req, res) => {
//   try {
//     const { userId, docId, slotDate, slotTime, amount } = req.body;

//     const user = await userModel.findById(userId).select('name image dob');
//     const doctor = await doctorModel.findById(docId).select('name image');

//     if (!user || !doctor) {
//       return res.status(404).json({ success: false, message: 'User or Doctor not found' });
//     }

//     const appointment = new appointmentModel({
//       userId,
//       docId,
//       slotDate,
//       slotTime,
//       amount,
//       userData: {
//         name: user.name,
//         image: user.image,
//         dob: user.dob
//       },
//       docData: {
//         name: doctor.name,
//         image: doctor.image
//       }
//     });

//     await appointment.save();

//     res.status(201).json({ success: true, message: 'Appointment booked', appointment });
//   } catch (error) {
//     console.error('Booking error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime, amount } = req.body;

    // Validate required fields
    if (!userId || !doctorId || !slotDate || !slotTime || !amount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const dateObj = new Date(slotDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid slotDate format' });
    }

    const dateKey = `${dateObj.getDate()}_${dateObj.getMonth() + 1}_${dateObj.getFullYear()}`;

    const user = await userModel.findById(userId).select('name image dob');
    const doctor = await docterModel.findById(doctorId).select('name image slots_booked');

    if (!user || !doctor) {
      return res.status(404).json({ success: false, message: 'User or Doctor not found' });
    }

    // Check for slot conflict
    const existingSlots = doctor.slots_booked.get(dateKey) || [];
    if (existingSlots.includes(slotTime)) {
      return res.status(409).json({ success: false, message: 'Slot already booked' });
    }

    // Add slot
    existingSlots.push(slotTime);
    doctor.slots_booked.set(dateKey, existingSlots);

    const appointment = new appointmentModel({
      userId,
      docId: doctorId,
      slotDate,
      slotTime,
      amount,
      userData: {
        name: user.name,
        image: user.image || '',
        dob: user.dob || ''
      },
      docData: {
        name: doctor.name,
        image: doctor.image || ''
      }
    });

    await appointment.save();
    doctor.markModified('slots_booked');
    await doctor.save();

    res.status(201).json({ success: true, message: 'Appointment booked', appointment });

  } catch (error) {
    console.error('📛 Booking error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// const listAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const appointments = await appointmentModel.find({ userId });
//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("💡 listAppointment: userId =", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

   const appointments = await appointmentModel.find({ userId }); // clean and safe

    console.log("✅ Appointments fetched:", appointments.length);
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("❌ listAppointment error:", error); // Full stack trace
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to cancel appointments
const cancelAppointments = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Get userId from auth middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // ✅ Proper ObjectId string comparison
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized action' });
    }

    // ✅ Avoid double cancellation
    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: 'Appointment already cancelled' });
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // ✅ Free up the doctor’s slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctor = await docterModel.findById(docId);
    const dateKey = formatDateKey(slotDate);

    if (doctor && doctor.slots_booked.has(dateKey)) {
      const updatedSlots = doctor.slots_booked.get(dateKey).filter(e => e !== slotTime);
      doctor.slots_booked.set(dateKey, updatedSlots);
      doctor.markModified('slots_booked');
      await doctor.save();
    }

    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointments
};
