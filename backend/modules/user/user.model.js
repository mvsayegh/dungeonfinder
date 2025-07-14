import mongoose from 'mongoose';

const contactInfo = new mongoose.Schema(
  {
    discord: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
  },
  {
    _id: false,
  }
);

const socialMedia = new mongoose.Schema(
  {
    twitter: { type: String },
    twitch: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
  },
  {
    _id: false,
  }
);

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
    contactInfo: contactInfo,
    socialMedia: socialMedia,
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);