import Factura from "../models/Facturas";
import Gasto from "../models/Gastos";

/**
 * @description Funciones para calcular los ingresos y egresos anuales.
 * @param year Año para el cual se calcularán los ingresos y egresos. 
 * @module ReportesAnuales
 * @requires Factura
 * @requires Gasto
 * @returns Retorna el total de ingresos o egresos del año especificado.
 * Estas funciones utilizan agregaciones de MongoDB para calcular los ingresos y egresos totales
 * de un año en especifico.
 * - `ingresosAnuales` calcula los ingresos totales de las facturas pagadas en un año.
 * - `egresosAnuales` calcula los egresos totales, es decir, los gastos realizados en un año.
 * En caso de que no existan ingresos o egresos, retorna 0.
 */

export const ingresosAnuales = async (year: number) => {
  const fechaInicial = new Date(year, 0, 1); // 1 de enero del año
  const fechaFinal = new Date(year + 1, 0, 1); // 1 de enero del siguiente año

  const ingresos = await Factura.aggregate([
    {
      $match: {
        estado: "pagada",
        fecha: { $gte: fechaInicial, $lt: fechaFinal },
      },
    },
    {
      $group: {
        _id: { $year: "$fecha" },
        totalIngresos: { $sum: "$monto" },
      },
    },
    {
      $sort: { _id: 1 }, // Ordenar por año ascendente
    },
  ]);
  return ingresos[0]?.totalIngresos || 0; // Retorna 0 si no hay ingresos
};

/**
 * @description Calcula los egresos totales de un año especifico.
 * @param year {number} Año para el cual se calcularan los egresos.
 * @returns {Promise<any>} Los egresos totales del año especificado.
 * 
 * La variable `egresos` almacena el resultado de una agregación de MongoDB que filtra los gastos
 * por el año indicado, agrupa los resultados por año y suma los montos de cada uno de los gastos.
 * si no hay egresos para el año especificado, retorna 0.
 */

export const egresosAnuales = async (year: number) => {
  const fechaInicial = new Date(year, 0, 1); // 1 de enero del año
  const fechaFinal = new Date(year + 1, 0, 1); // 1 de enero del siguiente año

  const egresos = await Gasto.aggregate([
    {
      $match: {
        fecha: { $gte: fechaInicial, $lt: fechaFinal },
      },
    },
    {
      $group: {
        _id: { $year: "$fecha" },
        totalEgresos: { $sum: "$monto" },
      },
    },
    {
      $sort: { _id: 1 }, // Ordenar por año ascendente
    },
  ]);
  return egresos[0]?.totalEgresos || 0;
};