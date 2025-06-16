import { Router } from "express";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/tareas.controller";
import { validarCampos } from "../utils/validarCampos";
import { protect } from "../middlewares/auth.middleware";

const tasksRouter = Router();

tasksRouter.get("/tasks", protect, getTask);

tasksRouter.get("/task/:id", protect, getTaskById);

tasksRouter.post(
  "/create", // Ruta hacia la que se hace la peticion
  validarCampos([ // Middleware que valida cada uno de los campos de la tarea a crear
    "nombre",
    "atencion",
    "estado",
    "fechaLimite",
    "usuario",
  ]),
  protect, // Middleware de autenticacion
  createTask // Controlador de la ruta (lógica para crear la tarea)
);

tasksRouter.patch("/update/:id", protect, updateTask);

tasksRouter.delete("/delete/:id", protect, deleteTask);

export default tasksRouter;
