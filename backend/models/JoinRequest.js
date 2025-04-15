const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
  gameTableId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameTable', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  message: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('JoinRequest', joinRequestSchema);
