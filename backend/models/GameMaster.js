const mongoose = require("mongoose");

const GameMasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    image: String,
    gameMasterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, default: null },
    contactInfo: {
      discord: { type: String, default: null },
      email: { type: String, default: null },
      phone: { type: String, default: null },
      website: { type: String, default: null },
    },
    socialMedia: {
      twitter: { type: String, default: null },
      twitch: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      tiktok: { type: String },
      youtube: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameMaster", GameMasterSchema);
