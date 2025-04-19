import { z } from "zod";
import RPG_SYSTEMS from "../../constants/enums/system.enum.js";  // Importação default
import RPG_STATUS from "../../constants/enums/status.enum.js";  // Importação default

// Schema para criação de uma Game Table
export const createGameTableSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  system: z.enum(RPG_SYSTEMS),
  maxPlayers: z.number().min(1, "Max players must be at least 1"),
  status: z.enum(RPG_STATUS).default("OPEN"),
  time: z.date(),
  duration: z.enum(["ONE_SHOT", "SHORT", "MEDIUM", "LONG"]),
  players: z.array(z.string()).optional(), // Array de IDs de players
});

// Schema para atualização de uma Game Table
export const updateGameTableSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  system: z.enum(RPG_SYSTEMS).optional(),
  maxPlayers: z.number().min(1).optional(),
  status: z.enum(RPG_STATUS).optional(),
  time: z.date().optional(),
  duration: z.enum(["ONE_SHOT", "SHORT", "MEDIUM", "LONG"]).optional(),
  players: z.array(z.string()).optional(),
});

const schemaGameTable = {
  createGameTableSchema,
  updateGameTableSchema,
};

export default schemaGameTable;
