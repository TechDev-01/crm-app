import { Request, Response } from "express";
import Cliente from "../models/Cliente";
import { ClienteInput } from "../types/cliente";
import mongoose from "mongoose";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const getClient = await Cliente.findById(req.params.id);
    if (!getClient) {
      res.status(404).json({ message: "El cliente no existe" });
      return;
    }
    res.json(getClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, empresa } = req.body as Partial<ClienteInput>;
    if (!nombre || !email || !telefono || !empresa) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }
    const newClient = new Cliente({
      nombre,
      email,
      telefono,
      empresa
    });
    const savedClient = await newClient.save();
    res.json(savedClient);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, empresa } = req.body;
    // Validacion de datos del cliente
    if (
      typeof nombre !== "string" ||
      typeof email !== "string" ||
      typeof telefono !== "string" ||
      typeof empresa !== "string"
    ) {
      res.status(400).json({ message: "¡Datos invalidos en la solicitud!" });
      return;
    }
    // Validacion de Id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Id invalido" });
      return;
    }
    const clientUpdated = await Cliente.findByIdAndUpdate( // Retorna el cliente actualizado en vez del anterior
      req.params.id,
      req.body,
      { new: true }
    );
    if (!clientUpdated) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }
    res.json(clientUpdated);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientDeleted = await Cliente.findByIdAndDelete(req.params.id);
    if (!clientDeleted) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }
    res.status(200).json({ message: "Cliente eliminado correctamente", clientDeleted });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
