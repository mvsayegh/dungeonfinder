import mongoose from 'mongoose';

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
    createdBy: {
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
      twitch: { type: String, default: null },
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      tiktok: { type: String, default: null},
      youtube: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameMaster", GameMasterSchema);
