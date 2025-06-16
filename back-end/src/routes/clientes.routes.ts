import { Router } from "express";
import { getClients, 
    createClient, 
    getClientById, 
    updateClient, 
    deleteClient} 
from "../controllers/clientes.controllers";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, getClients);

router.get("/get/:id", protect, getClientById);

router.post("/create", protect, createClient);

router.patch("/update/:id", protect, updateClient);

router.delete("/delete/:id", protect, deleteClient);

export default router;