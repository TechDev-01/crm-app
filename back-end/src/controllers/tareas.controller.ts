import { Request, Response } from "express";
import Tareas from "../models/Tareas";
import { actualizarCampos } from "../utils/validarCampos";

export const getTask = async (req: Request, res: Response) => {
  try {
    const tareas = await Tareas.find();
    if (!tareas) {
      res.status(404).json({ message: "No se encontraron las tareas" });
      return;
    }
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo tareas" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { nombre, fecha, atencion, estado, fechaLimite, usuario } = req.body;

    const newTask = new Tareas({
      nombre,
      fecha,
      atencion,
      estado,
      fechaLimite,
      usuario,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creando tareas" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { nombre, atencion, estado, fechaLimite } = req.body;
    actualizarCampos(["nombre", "atencion", "estado", "fechaLimite"], req.body);
    const fieldsUpdated = { nombre, atencion, estado, fechaLimite };

    const taskUpdated = await Tareas.findByIdAndUpdate(
      req.params.id,
      fieldsUpdated,
      { new: true }
    );
    if (!taskUpdated) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }
    res.json(taskUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando tareas" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Tareas.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }
    res.send("Tarea eliminada");
  } catch (error) {
    res.status(500).json({ message: "Error eliminando la tarea" });
  }
};
