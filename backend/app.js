const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const gameTableRoutes = require("./routes/gameTableRoutes");
const userRoutes = require("./routes/userRoutes");
const gameMasterRoutes = require("./routes/gameMasterRoutes")
const app = express();

require("dotenv").config();

// Cria o servidor HTTP com Express
const server = http.createServer(app);

// Configura o Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const routes = [
  { path: "/api/auth", route: authRoutes },
  { path: "/api/users", route: userRoutes },
  { path: "/api/game-tables", route: gameTableRoutes },
  { path: "/api/game-masters", route: gameMasterRoutes },
];

routes.forEach(({ path, route }) => {
  app.use(path, route);
});

// Conexão do socket
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("sendMessage", (data) => {
    io.to(data.gameTableId).emit("receiveMessage", data);
  });

  socket.on("joinGameTable", (gameTableId) => {
    socket.join(gameTableId);
    console.log(`Player joined game table: ${gameTableId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = server;
