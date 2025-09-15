const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { name, email, password, role, department, rollNumber, facultyId } = req.body;
  try {
    if (!email.endsWith('@youruniversity.edu')) {
      return res.status(400).json({ msg: 'Email must be from @youruniversity.edu' });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password: bcrypt.hashSync(password, 10), role, department, rollNumber, facultyId });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, rollNumber, facultyId } = req.body;
  try {
    if (!email.endsWith('@youruniversity.edu')) {
      return res.status(400).json({ msg: 'Email must be from @youruniversity.edu' });
    }
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    if (rollNumber && user.role === 'student' && user.rollNumber !== rollNumber) {
      return res.status(401).json({ msg: 'Invalid roll number' });
    }
    if (facultyId && user.role === 'faculty' && user.facultyId !== facultyId) {
      return res.status(401).json({ msg: 'Invalid faculty ID' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
