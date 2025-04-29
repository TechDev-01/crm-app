import jwt from "jsonwebtoken";
import { CLIENT_RENEG_LIMIT } from "tls";

export const generateToken = (
  userId: string,
  username: string,
) => {
  const JWT_SECRET = process.env.JWT_SECRET || "default"
  return jwt.sign({ id: userId, username }, JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

// Funcion para verificar si el token es valido
export const verifyToken = (token: string) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "default"
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token invalido o expirado");
  }
};
