// models.js

const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  accountStatus: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  preferences: { type: Object, default: {} }
});

// Define the Resume schema
const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: { type: Object, required: true },
  education: [{ type: Object }],
  skills: [{ type: String }],
  experience: [{ type: Object }]
});

// Define the Template schema
const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  previewImage: { type: String, required: true }, // URL or path to the preview image
  layout: { type: Object, required: true },
  description: { type: String, required: true }
});

// Define the JobApplication schema
const JobApplicationSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: { type: String, enum: ['applied', 'interviewing', 'rejected', 'offered'], default: 'applied' },
  submissionDate: { type: Date, default: Date.now }
});

// Define the Analytics schema
const AnalyticsSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  feedback: [{ type: String }]
});

// Create models from schemas
const User = mongoose.model('User', UserSchema);
const Resume = mongoose.model('Resume', ResumeSchema);
const Template = mongoose.model('Template', TemplateSchema);
const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
const Analytics = mongoose.model('Analytics', AnalyticsSchema);

module.exports = { User, Resume, Template, JobApplication, Analytics };
