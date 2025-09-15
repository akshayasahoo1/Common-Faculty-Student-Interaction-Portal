const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
  department: { type: String },
  rollNumber: { type: String, unique: true, sparse: true },
  facultyId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('User', userSchema);