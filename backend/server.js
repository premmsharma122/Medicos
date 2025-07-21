import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/docterRoute.js'; // Keep filename as-is for now
import userRouter from './routes/userRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and cloud
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter); // 🔄 Use "doctor" in route path, not "docter"
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send('API Working'));

// Start server
app.listen(port, () => console.log(`✅ Server started on port ${port}`));
