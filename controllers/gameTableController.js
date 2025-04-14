const GameTable = require("../models/GameTable");
const JoinRequest = require("../models/JoinRequest");
const { io } = require('../app');

// Criar uma nova mesa (protegida)
exports.createGameTable = async (req, res) => {
  try {
    const {
      title,
      description,
      system,
      type,
      mode,
      platform,
      maxPlayers,
      dayOfWeek,
      time,
    } = req.body;

    // Verifica se o usuário é um Mestre de Jogo (Role: GAME_MASTER)
    if (req.user.role !== "GAME_MASTER") {
      return res
        .status(403)
        .json({ message: "Only Game Masters can create tables" });
    }

    const newGameTable = new GameTable({
      title,
      description,
      system,
      type,
      mode,
      platform,
      gameMasterId: req.user.id, // Pega o id do usuário autenticado
      maxPlayers,
      dayOfWeek,
      time,
    });

    await newGameTable.save();

    res
      .status(201)
      .json({ message: "Game Table created successfully", newGameTable });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Listar todas as mesas disponíveis (para jogadores)
exports.listAvailableGameTables = async (req, res) => {
    try {
      // Pega os parâmetros de paginação da query string
      const { page = 1, limit = 10 } = req.query;
  
      // Validação dos parâmetros de página e limite
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
  
      // Se os parâmetros de página ou limite forem inválidos, retornar erro
      if (isNaN(pageNumber) || isNaN(pageSize)) {
        return res.status(400).json({ message: "Invalid page or limit parameter" });
      }
  
      // Calcular o número de documentos a serem pulados (offset)
      const skip = (pageNumber - 1) * pageSize;
  
      // Buscar as mesas abertas com a paginação
      const gameTables = await GameTable.find({ status: "OPEN" })
        .skip(skip) // Pular a quantidade de itens conforme a página
        .limit(pageSize) // Limitar a quantidade de itens por página
        .populate("gameMasterId", "name") // Adiciona informações do mestre de jogo
        .exec();
  
      // Contagem total de mesas abertas (para calcular total de páginas)
      const totalGameTables = await GameTable.countDocuments({ status: "OPEN" });
  
      // Calcular o número total de páginas
      const totalPages = Math.ceil(totalGameTables / pageSize);
  
      // Resposta com dados da mesa e informações de paginação
      res.json({
        gameTables,
        pagination: {
          page: pageNumber,
          limit: pageSize,
          totalPages,
          totalItems: totalGameTables,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  };
  

// Jogador se inscreve em uma mesa
exports.joinGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable)
      return res.status(404).json({ message: "Game Table not found" });

    if (gameTable.players.length >= gameTable.maxPlayers) {
      return res.status(400).json({ message: "Game Table is full" });
    }

    // Verifica se o jogador já está inscrito
    if (gameTable.players.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this game table" });
    }

    gameTable.players.push(req.user.id); // Adiciona o jogador à mesa
    await gameTable.save();

    res
      .status(200)
      .json({ message: "Successfully joined the game table", gameTable });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Solicitação de participação (cria uma requisição de inscrição)
exports.requestJoinGameTable = async (req, res) => {
  const { gameTableId } = req.params;

  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable)
      return res.status(404).json({ message: "Game Table not found" });

    // Verifica se o jogador já está inscrito
    const alreadyRequested = await JoinRequest.findOne({
      gameTableId,
      playerId: req.user.id,
      status: "PENDING",
    });
    if (alreadyRequested)
      return res
        .status(400)
        .json({
          message: "You have already requested to join this game table",
        });

    const joinRequest = new JoinRequest({
      gameTableId,
      playerId: req.user.id,
    });

    await joinRequest.save();

    res
      .status(200)
      .json({ message: "Join request submitted successfully", joinRequest });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Aceitar ou Rejeitar uma solicitação de jogador (só mestre de jogo)
exports.respondToJoinRequest = async (req, res) => {
  const { joinRequestId } = req.params;
  const { action } = req.body; // 'ACCEPTED' ou 'REJECTED'

  try {
    const joinRequest = await JoinRequest.findById(joinRequestId).populate(
      "gameTableId playerId"
    );
    if (!joinRequest)
      return res.status(404).json({ message: "Join Request not found" });

    // Verifica se o mestre de jogo é o mesmo que o autor da mesa
    if (joinRequest.gameTableId.gameMasterId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not the game master of this table" });
    }

    if (action !== "ACCEPTED" && action !== "REJECTED") {
      return res.status(400).json({ message: "Invalid action" });
    }

    joinRequest.status = action;
    await joinRequest.save();

    // Se for aceito, adiciona o jogador à mesa
    if (action === "ACCEPTED") {
      const gameTable = joinRequest.gameTableId;
      gameTable.players.push(joinRequest.playerId);
      await gameTable.save();
    }

    // Notificação para o jogador
    io.to(joinRequest.playerId.toString()).emit("notification", {
      message: `Your join request for table "${joinRequest.gameTableId.title}" was ${action}`,
    });

    res.status(200).json({ message: `Join Request ${action}`, joinRequest });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
