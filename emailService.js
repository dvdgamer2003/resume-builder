const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Email templates
const EMAIL_TEMPLATES = {
    WELCOME: 'welcome',
    VERIFICATION: 'verification',
    RESET_PASSWORD: 'reset-password',
    RESUME_SHARED: 'resume-shared'
};

const emailService = {
    // Send generic email
    sendEmail: async (to, subject, text, html = null) => {
        try {
            const mailOptions = {
                from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                text,
                html: html || text
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    },

    // Send verification email
    sendVerificationEmail: async (to, token) => {
        const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}`;
        const subject = 'Verify Your Email - Resume Builder';
        const html = `
            <h1>Welcome to Resume Builder!</h1>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>If the button doesn't work, copy and paste this link in your browser:</p>
            <p>${verificationLink}</p>
            <p>This link will expire in 24 hours.</p>
        `;
        
        return await emailService.sendEmail(to, subject, verificationLink, html);
    },

    // Send password reset email
    sendResetPasswordEmail: async (to, token) => {
        const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
        const subject = 'Reset Your Password - Resume Builder';
        const html = `
            <h1>Password Reset Request</h1>
            <p>You requested to reset your password. Click the link below to set a new password:</p>
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link in your browser:</p>
            <p>${resetLink}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;
        
        return await emailService.sendEmail(to, subject, resetLink, html);
    },

    // Send resume shared notification
    sendResumeSharedEmail: async (to, resumeLink, sharedBy) => {
        const subject = 'Resume Shared With You - Resume Builder';
        const html = `
            <h1>Resume Shared With You</h1>
            <p>${sharedBy} has shared their resume with you.</p>
            <a href="${resumeLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Resume</a>
            <p>If the button doesn't work, copy and paste this link in your browser:</p>
            <p>${resumeLink}</p>
        `;
        
        return await emailService.sendEmail(to, subject, `${sharedBy} has shared their resume with you: ${resumeLink}`, html);
    },

    // Send welcome email after verification
    sendWelcomeEmail: async (to, name) => {
        const subject = 'Welcome to Resume Builder!';
        const html = `
            <h1>Welcome to Resume Builder, ${name}!</h1>
            <p>Thank you for verifying your email address. You can now start creating your professional resume.</p>
            <p>Here are some tips to get started:</p>
            <ul>
                <li>Choose from our professional templates</li>
                <li>Fill in your details</li>
                <li>Get AI-powered suggestions</li>
                <li>Download or share your resume</li>
            </ul>
            <a href="${process.env.APP_URL}/dashboard" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        `;
        
        return await emailService.sendEmail(to, subject, `Welcome to Resume Builder, ${name}!`, html);
    },

    // Verify email configuration
    verifyEmailConfig: async () => {
        try {
            await transporter.verify();
            console.log('Email service is ready');
            return true;
        } catch (error) {
            console.error('Email service configuration error:', error);
            return false;
        }
    }
};

module.exports = emailService;
