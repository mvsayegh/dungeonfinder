const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

// Registro de usuários;
router.post('/register', register);

// Verificação de e-mail dos usuários;
router.get('/verify-email', verifyEmail);

// Acesso de usuários;
router.post('/login', login);

module.exports = router;
