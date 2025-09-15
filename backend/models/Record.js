const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    name: String,
    dob: Date,
    phone: String,
    address: String
  },
  academicInfo: {
    grades: String,
    courses: [String],
    semester: String
  },
  projects: [{ title: String, description: String, fileUrl: String }],
  internships: [{ company: String, role: String }],
  lor: {
    requestText: String,
    fileUrl: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    feedback: String,
  },
  certifications: [{ name: String, issuer: String, date: Date }],
  createdAt: { type: Date, default: Date.now },
  // CHANGE HERE: Add fields like awards or extracurriculars to match institution needs
});

module.exports = mongoose.model('Record', recordSchema);
