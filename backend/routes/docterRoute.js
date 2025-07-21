// import express from 'express'
// import { docterList } from '../controllers/docterController.js'

// const docterRouter = express.Router()

// docterRouter.get('/list', docterList)
// export default docterRouterimport express from 'express';
import express from 'express';
import { docterList, getDocterById, chnageAvailablity } from '../controllers/docterController.js';

const docterRouter = express.Router();

// Route to get all doctors
docterRouter.get('/list', docterList);

// ✅ Route to get doctor by ID
docterRouter.get('/:id', getDocterById);

// (Optional) Route to change doctor availability (if used elsewhere)
docterRouter.post('/change-availability', chnageAvailablity);

export default docterRouter;
