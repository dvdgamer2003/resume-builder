const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalInfo: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    education: [{
        degree: String,
        school: String,
        graduationYear: Number
    }],
    workExperience: [{
        jobTitle: String,
        company: String,
        duration: String
    }],
    skills: [String],
    template: {
        type: String,
        enum: ['creative', 'corporate', 'student'],
        default: 'corporate'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema); 