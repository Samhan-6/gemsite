const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  // 1) create a Transporter
  const transporter = nodemailer.transporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // 2) Define the email options
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  // 3) Actually send the email
  const info = await transporter.sendMail(mailOptions)

  console.log(`Message sent : %s`, info.messageId)
}

module.exports = sendEmail
