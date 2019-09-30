const nodemailer = require('nodemailer');

module.exports = function(data, callback) {
  const { mailTo, mailSubject, mailHtml } = data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abcd@gmail.com',
      pass: 'password'
    }
  });

  const mailOptions = {
    from: 'abcd@gmail.com',
    to: mailTo,
    subject: mailSubject,
    html: mailHtml
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error, true);
    } else {
      callback(info, false);
    }
  });
};
