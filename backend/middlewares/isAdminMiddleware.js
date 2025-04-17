const User = require('../models/User');

const isAdminMiddleware = (req, res, next) => {
  const userId = req.user.id;  // Recuperando o userId do token decodificado

  User.findById(userId)
    .then(user => {
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admin only' });
      }
      next();
    })
    .catch(err => {
      return res.status(500).json({ message: 'Error checking user role' });
    });
};

module.exports = isAdminMiddleware;