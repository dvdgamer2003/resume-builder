const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: 'your-email@example.com',
    subject,
    text,
  };

  sgMail.send(msg).then(() => {
    console.log('Email sent');
  }).catch((error) => {
    console.error(error);
  });
};

module.exports = sendEmail;
