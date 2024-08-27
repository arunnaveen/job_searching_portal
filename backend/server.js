const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const register = require("./routes/userRoute");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const protect = require("./middleware/authenticateJWT");

const app = express();
app.use(cors());

// Increase payload size limits to handle large file uploads
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Configure `multer` for file uploads
const storage = multer.memoryStorage(); // Using memory storage, can switch to disk storage if needed
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Set file size limit to 50MB
});

// Routes configuration
app.use('/api/user', register);
app.use('/api/jobprovider', protect, upload.single('logo'), require("./routes/jobProviderRoute"));
app.use('/api/jobseeker', protect, upload.fields([{ name: 'profile' }, { name: 'resume' }]), require("./routes/jobSeekerRoute"));
app.use('/api/jobdetail', require("./routes/jobDetailsRoute"));
app.use('/api/jobapply', require('./routes/jobApplyRoute'));


// Error handling middleware for large payloads
app.use((err, req, res, next) => {
    if (err.status === 413) {
        return res.status(413).json({ message: 'Payload too large!' });
    }
    next(err);
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
