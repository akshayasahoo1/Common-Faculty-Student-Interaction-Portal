const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
// CHANGE HERE: Ensure correct paths to User.js and Record.js
const User = require('../models/user'); // Verify User.js exists
const Record = require('../models/Record'); // Verify Record.js exists
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/submit', authMiddleware, roleMiddleware(['student']), async (req, res) => {
  const { personalInfo, academicInfo, projects, internships, lor } = req.body;
  try {
    const record = new Record({
      studentId: req.user.id,
      personalInfo,
      academicInfo,
      projects,
      internships,
      lor: { requestText: lor.requestText, status: 'pending', fileUrl: lor.fileUrl },
    });
    await record.save();
    res.json({ msg: 'Record submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/upload', authMiddleware, roleMiddleware(['student']), upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed' });
  }
});

router.get('/my-records', authMiddleware, roleMiddleware(['student']), async (req, res) => {
  try {
    const records = await Record.find({ studentId: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/all-pending', authMiddleware, roleMiddleware(['faculty']), async (req, res) => {
  try {
    const records = await Record.find({ 'lor.status': 'pending' }).populate('studentId', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/validate/:id', authMiddleware, roleMiddleware(['faculty']), async (req, res) => {
  const { status, feedback, personalInfo, academicInfo, projects, internships } = req.body;
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ msg: 'Record not found' });
    record.personalInfo = personalInfo || record.personalInfo;
    record.academicInfo = academicInfo || record.academicInfo;
    record.projects = projects || record.projects;
    record.internships = internships || record.internships;
    record.lor.status = status || record.lor.status;
    record.lor.feedback = feedback || record.lor.feedback;
    await record.save();
    res.json({ msg: 'Record updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/all-records', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const records = await Record.find().populate('studentId', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/by-course/:course', authMiddleware, roleMiddleware(['faculty', 'admin']), async (req, res) => {
  try {
    const records = await Record.find({ 'academicInfo.courses': req.params.course }).populate('studentId', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;