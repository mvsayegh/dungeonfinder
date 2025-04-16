const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['GAME_MASTER', 'PLAYER'], required: true },
  experienceLevel: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
  preferredSystems: [String],
  availability: {
    days: [String],
    timeOfDay: String
  },
  // Campos para verificação de e-mail 👇
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);