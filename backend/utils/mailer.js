// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendVerificationEmail = async (to, token, name) => {
  const url = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"RPG Mesas" <noreply@rpgmesas.com>',
    to,
    subject: "Confirme seu e-mail",
    html: `<p>Olá ${name},</p><p>Por favor, clique no link abaixo para verificar seu e-mail:</p>
           <a href="${url}">Verificar e-mail</a>`,
  });
};

module.exports = { sendVerificationEmail };
