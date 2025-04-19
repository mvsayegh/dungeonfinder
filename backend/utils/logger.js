import { fileURLToPath } from 'url';
import winston from 'winston';
import fs from 'fs';
import path from 'path';
import 'winston-daily-rotate-file';

// Corrigir __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório de logs
const logDir = path.join(__dirname, 'logs');

// Criar diretório se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Configuração de rotação de arquivos de log
const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, '%DATE%-log.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,  // Compactar arquivos antigos
  maxSize: '20m',  // Máximo de 20MB por arquivo
  maxFiles: '14d'  // Manter logs por 14 dias
});

// Criar logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    transport,  // Usando a rotação de arquivos
  ],
});

export default logger;
