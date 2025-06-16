import { Router } from "express";
import {
  getBalanceGeneral,
  getIngresosAnuales,
  getIngresosMensuales,
} from "../controllers/reportes.controller";
import { protect } from "../middlewares/auth.middleware";

const reportRouter = Router();

reportRouter.get("/mensual", protect, getIngresosMensuales);

reportRouter.get("/anual", protect);

reportRouter.get("/anual", protect, getIngresosAnuales);

reportRouter.get("/balance", protect, getBalanceGeneral);

export default reportRouter;
