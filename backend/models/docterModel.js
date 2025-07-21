
import mongoose from "mongoose";

const docterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: String, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },

    // ✅ Better structure using Map for date-based booking
    slots_booked: {
      type: Map,
      of: [String],
      default: {},
    },
  },
  { minimize: false }
);

const docterModel = mongoose.models.docter || mongoose.model('docter', docterSchema);

export default docterModel;
