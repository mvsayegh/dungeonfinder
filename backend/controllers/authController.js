const authService = require('../services/authService');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const token = await authService.register({ name, email, password, role });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
