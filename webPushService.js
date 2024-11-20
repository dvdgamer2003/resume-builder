const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BBZ_INykQ4CBUWvGq6rKMRX7B4wASpeueqNVxymXidibKUwKc6dxMRbE0l53c5xkwPHIrCbnNdxtua2XDjMV-sY',
  privateKey: '8TShOvSiz5wpFH-iLnLJKyJzCWp0R1Z26hni8Hz1w7c'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendPushNotification = (subscription, payload) => {
  webpush.sendNotification(subscription, payload)
    .catch((error) => {
      console.error('Error sending push notification:', error);
    });
};

module.exports = sendPushNotification;
