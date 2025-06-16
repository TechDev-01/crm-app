import { Router } from "express";
import { getBill, createBill, deleteBill } from "../controllers/facturas.controller";
import { protect } from "../middlewares/auth.middleware";
import { validarCampos } from "../utils/validarCampos";

const facturaRouter = Router();

facturaRouter.get("/bills", protect, getBill);

facturaRouter.post(
  "/create",
  validarCampos([
    "descripcion",
    "metodoPago",
    "estado",
    "cliente",
    "fecha",
    "monto",
  ]),
  protect,
  createBill
);

facturaRouter.delete("/delete/:id", protect, deleteBill)

export default facturaRouter;
