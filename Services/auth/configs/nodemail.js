const path = require('path');

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

async function dispatchEmail(to, subject, template, context) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: 'Soccer Stats <support@soccerstats.com>',
    to,
    subject,
    template,
    context,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = dispatchEmail;
