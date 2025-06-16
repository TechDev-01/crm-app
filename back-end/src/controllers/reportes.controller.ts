import { Request, Response } from "express";
import { ingresosMensuales, egresosMensuales, balanceGeneral } from "../utils/reportes";
import { ingresosAnuales, egresosAnuales } from "../utils/reportesAnuales";

export const getIngresosMensuales = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      res.status(400).json({ message: "Mes y año son requeridos" });
      return;
    }
    const ingresos = await ingresosMensuales(Number(month), Number(year));
    const egresos = await egresosMensuales(Number(month), Number(year));
    const total = ingresos - egresos;

    if (total < 0) {
      res.status(400).json({ message: "El total no puede ser negativo" });
      return;
    }
    res.status(200).json({ month, year, ingresos, egresos, total });
  } catch (error) {
    console.error("Error al obtener ingresos mensuales:", error);
    res.status(500).json({ message: "Error al obtener ingresos mensuales" });
  }
};

export const getIngresosAnuales = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    if (!year) {
      res.status(400).json({ message: "El año es requerido" });
      return;
    }
    const ingresos = await ingresosAnuales(Number(year));
    const egresos = await egresosAnuales(Number(year));
    const total = ingresos - egresos;
    res.status(200).json({ year, ingresos, egresos, total });
  } catch (error) {
    console.error("Error al obtener ingresos anuales:", error);
    res.status(500).json({ message: "Error al obtener ingresos anuales" });
  }
};

export const getBalanceGeneral = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    if(!month || !year) { res.status(400).json({ message: "Mes y año son requeridos" }); return; }
    const balance = await balanceGeneral(Number(month), Number(year));
    res.status(200).json({ month, year, balance });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener balance general" });
  }
}