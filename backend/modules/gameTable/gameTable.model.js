import mongoose from "mongoose";
import RPG_SYSTEMS from "../../constants/enums/system.enum.js";
import RPG_STATUS from "../../constants/enums/status.enum.js";
import GAME_DURATION from "../../constants/enums/duration.enum.js";

const { Schema, model, Types } = mongoose;

// AgendaDaySchema separado para reusabilidade futura
const AgendaDaySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  },
  {
    _id: false,
  }
);

// Schema principal
const GameTableSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
    },
    system: {
      type: String,
      enum: RPG_SYSTEMS,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
      min: [1, "Deve haver pelo menos 1 jogador."],
      max: [20, "Número máximo de jogadores excedido."],
    },
    status: {
      type: String,
      enum: RPG_STATUS,
      default: "OPEN",
    },
    gameDate: {
      type: [AgendaDaySchema],
      validate: [arrayLimit, "{PATH} não pode estar vazio."],
    },
    duration: {
      type: String,
      required: true,
      enum: GAME_DURATION,
    },
    userGm: {
      type: Types.ObjectId,
      ref: "User",
    },
    players: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Validação auxiliar
function arrayLimit(val) {
  return val.length > 0;
}

export default model("GameTable", GameTableSchema);
