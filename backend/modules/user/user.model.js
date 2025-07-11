import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["PLAYER", "GAMEMASTER", "ADMIN"],
      default: "PLAYER",
    },
    experienceLevel: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
    },
    preferredSystems: [String],
    availability: {
      days: [String],
      timeOfDay: String,
    },
    profilePicture: String,
    bio: String,
    location: String,
    contactInfo: {
      discord: String,
      email: String,
      phone: String,
      website: String,
    },
    socialMedia: {
      twitter: String,
      twitch: String,
      facebook: String,
      instagram: String,
      tiktok: String,
      youtube: String,
    },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);