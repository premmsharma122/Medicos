
import express from 'express';
import {
  addDocter,
  allDocters,
  loginAdmin,
  appointmentsAdmin, 
  adminDashboard
} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { chnageAvailablity } from '../controllers/docterController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDocter);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-docters', authAdmin, allDocters);
adminRouter.post('/change-availablity', authAdmin, chnageAvailablity); // ✅ spelling matched
adminRouter.get('/appointments', authAdmin, appointmentsAdmin); // ✅ spelling matched
adminRouter.get('/dashboard', authAdmin, adminDashboard);
export default adminRouter;
