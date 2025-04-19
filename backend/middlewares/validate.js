import { ZodError } from "zod";
import { errorResponse } from "../utils/responseHelper.js";

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map(e => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return errorResponse(res, "Validation failed", 400, errors);
    }

    // Erro inesperado
    return errorResponse(res, "Unexpected validation error", 500);
  }
};
