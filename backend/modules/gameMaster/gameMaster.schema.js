import { z } from "zod";

// Schema para criação de um Game Master
export const createGameMasterSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  nickname: z.string().min(2, "Nickname is too short").max(30, "Nickname is too long"),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional(),
  location: z.string().optional(),
  contactInfo: z.object({
    discord: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
  socialMedia: z.object({
    twitter: z.string().url().optional(),
    twitch: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }).optional(),
});

// Schema para atualização de um Game Master
export const updateGameMasterSchema = z.object({
  name: z.string().min(2).optional(),
  nickname: z.string().min(2).max(30).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional(),
  location: z.string().optional(),
  contactInfo: z.object({
    discord: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
  socialMedia: z.object({
    twitter: z.string().url().optional(),
    twitch: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }).optional(),
});

const schemaGameMaster = {
  createGameMasterSchema,
  updateGameMasterSchema
}

export default schemaGameMaster;