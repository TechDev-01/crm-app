import { Request, Response } from "express";
import Actividad from "../models/actividadesSchema";
import mongoose, { Types } from "mongoose";

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { tipo, descripcion, cliente } = req.body;
    const newActivity = new Actividad({
      tipo,
      descripcion,
      cliente: new mongoose.Types.ObjectId(cliente),
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error interno" });
  }
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Actividad.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error interno" });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Actividad.findById(req.params.id);
    if(!activity) { res.status(404).json({ message: "La tarea no existe"}); return};
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: "Error interno" });
  }
};