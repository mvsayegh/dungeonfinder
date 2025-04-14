const mongoose = require('mongoose');

const GameTableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  system: {
    type: String,
    enum: ['DND_5E', 'DND_3_5', 'PATHFINDER', 'CALL_OF_CTHULHU', 'CUSTOM'],
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1,
  },
  time: {
    type: Date,
    required: true,
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  gameMasterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('GameTable', GameTableSchema);
