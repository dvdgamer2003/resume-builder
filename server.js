const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailService = require('./emailService');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        
        await emailService.sendVerificationEmail(email, token);
        res.json({ message: 'Verification email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error during signup' });
    }
});

app.post('/api/save-resume', async (req, res) => {
    try {
        // Save resume data to MongoDB
        const resume = new Resume(req.body);
        await resume.save();
        res.json({ message: 'Resume saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving resume' });
    }
});

app.post('/api/analyze-resume', async (req, res) => {
    try {
        // Implement AI analysis logic here
        const analysis = {
            score: 85,
            suggestions: [
                'Add more quantifiable achievements',
                'Include relevant keywords',
                'Proofread for clarity'
            ]
        };
        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing resume' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
