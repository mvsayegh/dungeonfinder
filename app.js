const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const gameTableRoutes = require('./routes/gameTableRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

require('dotenv').config();

// Cria o servidor HTTP com Express
const server = http.createServer(app);

// Configura o Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/games', gameTableRoutes);
app.use('/api/user', userRoutes);

// Conexão do socket
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // Evento de mensagem de chat
  socket.on('sendMessage', (data) => {
    // Envia a mensagem para todos os clientes que estão conectados a essa sala de jogo
    io.to(data.gameTableId).emit('receiveMessage', data);
  });

  // Entrar na sala específica da mesa de jogo
  socket.on('joinGameTable', (gameTableId) => {
    socket.join(gameTableId); // O jogador entra na sala da mesa
    console.log(`Player joined game table: ${gameTableId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = server;
