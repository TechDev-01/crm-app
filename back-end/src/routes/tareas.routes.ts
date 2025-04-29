import { Router } from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/tareas.controller";
import { validarCampos } from "../utils/validarCampos";
import { protect } from "../middlewares/auth.middleware";

const tasksRouter = Router();

tasksRouter.get("/tasks", getTask);

tasksRouter.post(
  "/createTask", // Ruta hacia la que se hace la peticion
  validarCampos([ // Middleware que valida cada uno de los campos de la tarea a crear
    "nombre",
    "fecha",
    "atencion",
    "estado",
    "fechaLimite",
    "usuario",
  ]),
  protect, // Middleware de autenticacion
  createTask // Controlador de la ruta (lógica para crear la tarea)
);

tasksRouter.patch("/updateTask/:id", protect, updateTask);

tasksRouter.delete("/deleteTask/:id", protect, deleteTask);

export default tasksRouter;
