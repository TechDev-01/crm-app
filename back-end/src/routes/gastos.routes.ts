import { Router } from "express"
import { getGastos, createGasto, deleteGasto, getgastoByDate } from "../controllers/gastos.controller";
import { protect } from "../middlewares/auth.middleware";

const gastosRouter = Router();

gastosRouter.get("/general", protect, getGastos);

gastosRouter.get("/filtrar", protect, getgastoByDate);

gastosRouter.post("/create", protect, createGasto);

gastosRouter.delete("/delete/:id", protect, deleteGasto);

export default gastosRouter;