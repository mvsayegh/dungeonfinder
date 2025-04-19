import logger from "../utils/logger.js";

export default (io) => {
  io.on("connection", (socket) => {
    logger.info(`🔌 User connected: ${socket.id}`);

    // Evento para o jogador entrar na mesa de jogo
    socket.on("joinGameTable", (gameTableId) => {
      socket.join(gameTableId);
      logger.info(`🎲 User ${socket.id} joined game table: ${gameTableId}`);
    });

    // Evento para enviar mensagens para a mesa de jogo
    socket.on("sendMessage", (data) => {
      io.to(data.gameTableId).emit("receiveMessage", data);
      logger.info(
        `💬 Message sent to game table ${data.gameTableId}: ${data.message}`
      );
    });

    // Evento de desconexão
    socket.on("disconnect", () => {
      logger.info(`❌ User disconnected: ${socket.id}`);
    });
  });
};
