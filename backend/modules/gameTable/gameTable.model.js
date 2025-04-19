import mongoose from "mongoose";
import RPG_SYSTEMS from "../../constants/enums/system.enum.js";  // Importação default
import RPG_STATUS from "../../constants/enums/status.enum.js";  // Importação default

const GameTableSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    image: String,
    system: { type: String, enum: RPG_SYSTEMS, required: true },
    maxPlayers: { type: Number, required: true, min: 1 },
    status: { type: String, enum: RPG_STATUS, default: "OPEN" },
    time: { type: Date, required: true },
    duration: {
      type: String,
      required: true,
      enum: ["ONE_SHOT", "SHORT", "MEDIUM", "LONG"],
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameTable", GameTableSchema);
