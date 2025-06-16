import mongoose from "mongoose";
import Gasto from "../models/Gastos";
import { Request, Response } from "express";

/** 
 * @description Controladores para manejar las operaciones CRUD relacionadas con los gastos.
 * @module GastosController
 * @requires moongoose
 * 
 * Cada función maneja una operación específica:
 * - `getGastos`: obtiene todos los gastos, ordenados por fecha y combinados con el usuario.
 * - `getgastoByDate`: obtiene los gastos dentro de un rango de fechas específico.
 * - `createGasto`: crea un nuevo gasto con los datos proporcionados.
 * - `deleteGasto`: elimina un gasto por su ID.
*/

export const getGastos = async (req: Request, res: Response) => {
  try {
    const gastos = await Gasto.find().populate("usuario", "username").sort({ fecha: -1 });
    if (!gastos) {
      res.status(404).json({ message: "No se encontraron gastos" });
      return;
    }
    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los gastos" });
  }
};

/**
 * @param req 
 * @param res 
 * @returns El gasto encontrado dentro del rango de fechas especificado.
 */
export const getgastoByDate = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query; 

    const start = new Date(startDate as string);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate as string);
    end.setUTCHours(23, 59, 59, 999);

    const gasto = await Gasto.find({
      fecha: {
        $gte: start,
        $lte: end,
      },
    });
    if (!gasto) {
      res.status(404).json({ message: "Gasto no encontrado" });
      return;
    }
    res.status(200).json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el gasto" });
  }
};

/**
  * @description Crea un nuevo gasto con los datos proporcionados en el cuerpo de la solicitud.
 * @param req 
 * @param res 
 * @returns Un objeto JSON con el gasto creado o un mensaje de error.
 */

export const createGasto = async (req: Request, res: Response) => {
  try {
    const {
      descripcion,
      metodoPago,
      monto,
      categoria,
      fecha,
      usuario,
      comprobanteUrl,
    } = req.body;

    const fechaNormalizada = new Date(fecha);
    fechaNormalizada.setUTCHours(12, 0, 0, 0); // Normalizar la fecha a medianoche

    const nuevoGasto = new Gasto({
      descripcion,
      metodoPago,
      monto,
      categoria,
      usuario: new mongoose.Types.ObjectId(usuario),
      comprobanteUrl,
      fecha: fechaNormalizada,
    });
    const gastoGuardado = await nuevoGasto.save();
    res.status(201).json(gastoGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el gasto" });
  }
};

/**
 * @description Elimina un gasto por su ID.
 * @param req 
 * @param res 
 * @returns Un mensaje de exito si el gasto fue eliminado correctamente, o un mensaje de error si no se encontró el gasto.
 */

export const deleteGasto = async (req: Request, res: Response) => {
  try {
    const gastoDeleted = await Gasto.findByIdAndDelete(req.params.id);
    if (!gastoDeleted) {
      res.status(404).json({ message: "Gasto no encontrado" });
      return;
    }
    res.status(200).json({ message: "Gasto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el gasto" });
  }
};
