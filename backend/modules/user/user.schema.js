import { z } from "zod";

// Define o esquema Zod para validar o objeto de User
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"), // Nome é obrigatório e deve ser uma string
  email: z.string().email("Invalid email format").min(1, "Email is required"), // E-mail é obrigatório e deve ser válido
  password: z.string().min(8, "Password must be at least 8 characters"), // Senha é obrigatória e deve ter pelo menos 8 caracteres
  role: z.enum(["USER", "ADMIN"]).default("USER"), // Função do usuário, pode ser USER ou ADMIN, o valor padrão é USER
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(), // Nível de experiência (opcional)
  preferredSystems: z.array(z.string()).optional(), // Sistemas preferidos, uma lista de strings (opcional)
  availability: z.object({
    days: z.array(z.string()).optional(), // Dias de disponibilidade (opcional)
    timeOfDay: z.string().optional(), // Horário do dia de disponibilidade (opcional)
  }).optional(),
  profilePicture: z.string().url().optional(), // Foto de perfil (opcional, caso seja uma URL)
  bio: z.string().optional(), // Biografia do usuário (opcional)
  location: z.string().optional(), // Localização do usuário (opcional)
  contactInfo: z.object({
    discord: z.string().optional(), // Discord do usuário (opcional)
    email: z.string().email("Invalid email format").optional(), // E-mail para contato (opcional)
    phone: z.string().optional(), // Telefone (opcional)
    website: z.string().url().optional(), // Site (opcional)
  }).optional(),
  socialMedia: z.object({
    twitter: z.string().optional(),
    twitch: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  verified: z.boolean().default(false), // Indica se o usuário foi verificado (padrão false)
  verificationToken: z.string().optional(), // Token de verificação (opcional)
});

// Você pode exportar o schema para usá-lo em validações
export default userSchema;
