import docterModel from "../models/docterModel.js";

const chnageAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await docterModel.findById(docId);
    await docterModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: 'Availability Changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const docterList = async (req, res) => {
  try {
    const docters = await docterModel.find({}).select('-password -email');
    res.json({ success: true, docters });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ New controller to get a single doctor by ID
const getDocterById = async (req, res) => {
  try {
    const doctor = await docterModel.findById(req.params.id).select('-password -email');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { chnageAvailablity, docterList, getDocterById };
