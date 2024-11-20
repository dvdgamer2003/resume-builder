const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  notificationPreferences: {
    email: Boolean,
    webPush: Boolean
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
