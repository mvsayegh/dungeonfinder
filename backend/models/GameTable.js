const mongoose = require("mongoose");
const { RPG_SYSTEMS } = require("./utils/system.enum");
const { RPG_STATUS } = require("./utils/status.enum");

const GameTableSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    image: String,
    system: {
      type: String,
      enum: RPG_SYSTEMS,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: RPG_STATUS,
      default: "OPEN",
    },
    time: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      enum: ["ONE_SHOT", "SHORT", "MEDIUM", "LONG"],
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameTable", GameTableSchema);
