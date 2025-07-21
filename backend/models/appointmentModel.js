// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//   slotDate: { type: String, required: true },
//   slotTime: { type: String, required: true },
//   amount: { type: Number, required: true },
//   date: { type: Number, required: true },
//   cancelled: { type: Boolean, default: false },
//   payment: { type: Boolean, default: false },
//   isCompleted: { type: Boolean, default: false },
// });

// const appointmentModel =
//   mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

// export default appointmentModel;
import mongoose from 'mongoose';

// const appointmentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//   docId: { type: mongoose.Schema.Types.ObjectId, ref: 'docter', required: true },
//   slotDate: String,
//   slotTime: String,
//   amount: Number,
//   date: { type: Date, default: Date.now },
//   cancelled: { type: Boolean, default: false }
// });
const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  slotDate: String,
  slotTime: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  cancelled: { type: Boolean, default: false },

  // Embed selected user info at time of booking
  userData: {
    name: String,
    image: String,
    dob: String,
  },

  // Embed selected doctor info at time of booking
  docData: {
    name: String,
    image: String,
  }
});

const appointmentModel = mongoose.model('appointments', appointmentSchema);
export default appointmentModel;
