const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:  587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'sigitech.cctv@gmail.com',
      pass: 'lsyxkkrmxjangamt'
    }
  });
  return (
      transporter.sendMail(options)
      .then((res) => console.log('xxx', res))
      .then((err) => console.log('err', err))
  )
};

module.exports = sendEmail;