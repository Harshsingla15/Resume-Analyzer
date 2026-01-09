import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(errorHandler(401, "Authorization token missing"));
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};
