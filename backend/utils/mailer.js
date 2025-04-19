import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Carregar variáveis de ambiente
dotenv.config();

// Criar o transportador do Nodemailer com configurações mais seguras
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Função para enviar e-mail de verificação
const sendVerificationEmail = async (email, token, name) => {
  const url = `${process.env.FRONTEND_URL}/verify-email/${token}`; // URL com o token
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verifique seu e-mail",
    html: `<p>Olá ${name},</p><p>Por favor, clique no link abaixo para verificar seu e-mail:</p>
           <a href="${url}">Verificar e-mail</a>`, // HTML com link para verificação
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para ${email}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail: ${error.message}`);
    throw new Error("Erro ao enviar o e-mail de verificação.");
  }
};

export { sendVerificationEmail };
