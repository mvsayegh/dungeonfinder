require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token, name) => {
  const url = `${process.env.FRONTEND_URL}/verify-email/${token}`; // Alteração para URL completa com :token
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verifique seu e-mail",
    html: `<p>Olá ${name},</p><p>Por favor, clique no link abaixo para verificar seu e-mail:</p>
           <a href="${url}">Verificar e-mail</a>`, // Alteração para HTML
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
