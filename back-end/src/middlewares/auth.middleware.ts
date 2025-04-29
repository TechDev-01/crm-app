import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
}
 // Funcion encargada de proteger las rutas con autenticación
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET || "defaul_secret";
  let token = req.cookies.access_token;
  if (!token || typeof token !== "string") {
    res.status(401).send("Acceso denegado: token no proporcionado");
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = decoded; // Guardamos los datos para acceder a ellos en las rutas
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Acceso denegado, token inválido o malformado" });
  }
};
