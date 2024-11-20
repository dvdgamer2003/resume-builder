const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String,
  message: String,
  userId: String,
  createdAt: Date
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
