const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/resume-builder', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the Resume model
const resumeSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String
});

const Resume = mongoose.model('Resume', resumeSchema);

// Define the API endpoints
router.get('/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});

router.get('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching resume' });
  }
});

router.put('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating resume' });
  }
});

router.delete('/resumes/:id', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting resume' });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const analytics = await Resume.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, views: { $sum: '$views' }, downloads: { $sum: '$downloads' } } }
    ]);
    res.json(analytics[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.put('/profile/notification', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { notificationPreferences: req.body }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating notification preferences' });
  }
});

router.put('/profile/payment', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { paymentSettings: req.body }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating payment settings' });
  }
});

module.exports = router;
