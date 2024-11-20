const express = require('express');
const app = express();
const adminApi = require('./admin/api');
const path = require('path');
const emailService = require('./emailService');

// ... existing code ...

app.use('/api', adminApi);

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.post('/sign-up', (req, res) => {
    // Call the signUp function here
    signUp(req.body);
    // Call the sendEmail function here
    emailService.sendEmail(req.body.email, 'Welcome to our platform!', 'Thank you for signing up!');
    res.send('Sign-up successful!');
});

// ... existing code ...
