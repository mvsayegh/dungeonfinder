// 🌍 Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// 📦 Core and Third-party Modules
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from '../backend/utils/logger.js';

// 🛠️ Middlewares & Utils
import errorHandler from './middlewares/errorHandler.js';

// 🛣️ Routes - Importando as rotas diretamente do index de cada módulo
import { authRoutes } from './modules/auth/index.js';
import { userRoutes } from './modules/user/index.js';
import { gameTableRoutes } from './modules/gameTable/index.js';
import { gameMasterRoutes } from './modules/gameMaster/index.js';

// 🎮 Socket Module
import socketEvents from './socket/index.js';

// 🚀 App & Server Initialization
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["https://dungeonfinder-j2v6.onrender.com", "http://localhost:4200/"],
    methods: ["GET", "POST"],
  },
});

// 🛠️ Rate Limiting Setup
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: "Too many requests from this IP, please try again later.",
});

// 🧩 Middleware Setup
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));  // Enable CORS for specific origins
app.use(express.json({ limit: '50mb' }));  // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // URL-encoded payload
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    logger.info(`${req.method} ${req.url}`);
  }
  next();
});

// 📦 Route Setup
const routes = [
  { path: "/api/auth", route: authRoutes },
  { path: "/api/users", route: userRoutes },
  { path: "/api/game-tables", route: gameTableRoutes },
  { path: "/api/game-masters", route: gameMasterRoutes },
];

routes.forEach(({ path, route }) => app.use(path, route));

// 🛡️ Security Middleware
app.use(helmet());  // Adds basic security headers
app.use(limiter);   // Apply rate limiting

// 🧨 Global Error Handler
app.use(errorHandler);

// 🎮 Initialize Socket.IO Events
socketEvents(io);

// 🚢 Export Server (used in index.js or server.js)
export default server;
