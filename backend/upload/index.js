const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
// CHANGE HERE: Add rate-limiting middleware
const rateLimit = require('express-rate-limit');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CHANGE HERE: Apply rate-limiting to all routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
});
app.use(limiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/records', require('./routes/records'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
