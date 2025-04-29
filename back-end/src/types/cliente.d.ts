import { JwtPayload } from "../middlewares/auth.middleware";

export interface ClienteInput {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}