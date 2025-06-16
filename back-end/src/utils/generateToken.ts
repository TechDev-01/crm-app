import jwt from "jsonwebtoken";

/**
 * @param userId {string} el ID del usuario que se usara como argumento generar el token
 * @param username {string} el nombre de usuario que se usuara como argumento en el token.
 * @returns {string} un token JWT firmado con el ID y nombre de usuario.
 * 
 * @description Esta funcion genera un token JWT que contiene el ID del usuario y su nombre de usuario.
 * que se usara para autenticar al usuario en las peticiones hacia el servidor.
 * 1. Obtiene el JWT secret de la variable de entorno `JWT_SECRET` o usa un valor por defecto.
 * 2. Usa la libreria `jsonwebtoken` para firmar un token con el ID y nombre de usuario.
 */

export const generateToken = (
  userId: string,
  username: string,
): string => {
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
