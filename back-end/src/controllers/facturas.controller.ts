import mongoose from "mongoose";
import Factura from "../models/Facturas";
import { Request, Response } from "express";

export const getBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const facturas = await Factura.find({ cliente: id });

    if (!facturas) {
      res.status(404).json({ message: "No se encontraron facturas" });
      return;
    }
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las facturas" });
  }
};

export const createBill = async (req: Request, res: Response) => {
  try {
    const { descripcion, metodoPago, monto, estado, cliente, fecha } = req.body;

    const nuevaFactura = new Factura({
      descripcion,
      metodoPago,
      monto,
      fecha,
      estado,
      cliente: new mongoose.Types.ObjectId(cliente),
    });
    const facturaGuardada = await nuevaFactura.save();
    res.status(201).json(facturaGuardada);
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const deletedBill = await Factura.findByIdAndDelete(req.params.id);
    if(!deletedBill) { res.status(404).json({ message: "Factura no encontrada" }); return; }
    res.status(200).json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la factura" });
  }
}