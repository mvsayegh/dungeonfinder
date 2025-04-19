import { CustomError } from "../errors/CustomErrors.js";
import logger from "../utils/logger.js";
// import Sentry from "../utils/sentry.js";

// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  // Captura o erro no Sentry
  // Sentry.captureException(err); // TODO: Estudar mais sobre Sentry.

  // Log do erro com informações detalhadas
  logger.error(`${err.statusCode} - ${err.message} - ${err.stack}`);

  // Caso seja um erro customizado (CustomError)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }
  

  // Caso seja um erro genérico (ex: TypeError, ReferenceError, etc.)
  console.error(err);  // Log no console do servidor

  // Envia uma resposta genérica de erro
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorHandler;
