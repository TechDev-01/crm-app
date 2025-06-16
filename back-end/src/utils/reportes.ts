import Factura from "../models/Facturas";
import Gasto from "../models/Gastos";

/**
 * @param month {number} mes al que se desea consultar (1-12)
 * @param year {number} año al que se desea consultar (YYYY)
 * @returns {Promise<number>} el total de ingresos del mes y el año especificado
 * 
 * @description Esta funcion calcula los ingresos mensuales totales de un mes y año especifico.
 * 1. Calcula la fecha de inicio y fin del mes.
 * 2. Busca todas las facturas pagadas en ese rango de fechas.
 * 3. Suma los montos de las facturas encontradas.
 * 4. Retorna el total de ingresos.
 * 
 * Suma los montos aplicando una reduccion sobre el arreglo de facturas.
 * Si no hay facturas pagadas en el mes, retorna 0.
 */

export const ingresosMensuales = async (month: number,year: number): Promise<number> => {
  const fechaInicio = new Date(Date.UTC(year, month - 1, 1)); // Primer día del mes
  const fechaFin = new Date(Date.UTC(year, month, 0)); // Ultimo día del mes

  const facturas = await Factura.find({
    estado: "pagada",
    fecha: { $gte: fechaInicio, $lt: fechaFin },
  });

  const totalIngresos = facturas.reduce((total, factura) => total + factura.monto,0);
  return totalIngresos;
};

/**
 * @param month {number} mes al que se desea consultar (1-12)
 * @param year {number} año al que se desea consultar (YYYY)
 * @returns {Promise<number>} el total de egresos del mes y el año especificado
 * 
 * @description Esta funcion calcula los egresos mensuales totales de un mes y año especifico
 * usando agrupaciones de MongoDB para sumar los egresos totales del mes.
 * 1. Calcula la fecha de inicio y fin del mes.
 * 2. Busca todas los gastos hechos en ese rango de fechas.
 * 3. Suma los montos de los gastos encontradas.
 * 4. Retorna el total de gastos.
 */
export const egresosMensuales = async (month: number, year: number): Promise<number> => {
  const fechaInicial = new Date(Date.UTC(year, month - 1, 1));
  const fechaFinal = new Date(Date.UTC(year, month, 1)); // Ultimo día del mes

  const egresos = await Gasto.aggregate([
    {
      $match: {
        fecha: {
          $gte: fechaInicial,
          $lt: fechaFinal,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalEgresos: { $sum: "$monto" },
      },
    },
  ]);
  return egresos[0]?.totalEgresos || 0; // Retorna 0 si no hay egresos
};

/**
 * @description Calcula el balance general de ingresos y egresos de un mes y año especifico.
 * @param month {number} mes al que se desea consultar (1-12)
 * @param year {number} año al que se desea consultar (YYYY)
 * @returns {Promise<{ ingresos: number, egresos: number, balance: number}>} un objeto con los totales de ingresos, egresos y balance del mes y año especificado
 * 
 * La funcion realiza lo siguiente:
 * 1. Calcula la fecha de inicio y fin del mes.
 * 2. Busca todas las facturas pagadas en ese rango de fechas y suma sus montos almacenando este resultado en un array `ingresosTotales`.
 * 3. Busca todos los gastos realizados en ese rango de fechas y suma sus montos almacenando este resultado en un array `egresosTotales`.
 * 4. Si no hay ingresos o egresos, retorna 0.
 */

export const balanceGeneral = async (month: number, year: number): Promise<{ ingresos: number; egresos: number; balance: number; }> => {
  const fechaInicio = new Date(Date.UTC(year, month - 1, 1));
  const fechaFin = new Date(Date.UTC(year, month, 0)); // Ultimo día del mes

  const [ingresosTotales] = await Factura.aggregate([
    { 
      $match: { 
        estado: "pagada",
        fecha: { $gte: fechaInicio, $lt: fechaFin }, 
      }, 
    },
    { $group: { _id: null, total: { $sum: "$monto" } } },
  ]);

  const [egresosTotales] = await Gasto.aggregate([
    { $match: { fecha: { $gte: fechaInicio, $lt: fechaFin } } },
    { $group: { _id: null, total: { $sum: "$monto" } } },
  ]);

  const ingresos = ingresosTotales?.total || 0;
  const egresos = egresosTotales?.total || 0;

  return {
    ingresos,
    egresos,
    balance: ingresos - egresos,
  }
}