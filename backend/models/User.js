const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  experienceLevel: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
  preferredSystems: [String],
  availability: {
    days: [String],
    timeOfDay: String
  },
  profilePicture: { type: String, default: null },
  bio: { type: String, default: null },
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
    tiktok: { type: String, default: null },
    youtube: { type: String, default: null },
  },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null, select: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);