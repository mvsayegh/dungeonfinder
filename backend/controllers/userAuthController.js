const userService = require('../services/userService');

// Listar todas as mesas de um usuário
exports.listUserTables = async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  try {
    const data = await userService.listUserTables(userId, { page, limit });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
