import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar campos requiridos en la peticion
 *
 * @param campos Arreglo de strings que representa los nombres de los campos requeridos.
 *
 * Este middleware se encarga de validar cada uno de los campos y que tengan el tipo de dato correcto
 * Si falta algun campo retorna un codigo de estado 400 y acaba la ejecucion de la ruta
 */

export const validarCampos = (campos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const campo of campos) {
      if (!req.body[campo]) {
        res.status(400).json({ message: `El campo ${campo} es obligaorio` });
      }
    }
    next();
  };
};

/**
 * La interfaz TareaBody contiene los valores que vienen en el cuerpo de la petición
 * para validar que cada uno de ellos sea valido
 */

interface TareaBody {
  nombre?: string;
  atencion?: "urgente" | "importante" | "aplazable";
  estado?: "pendiente" | "resuelta";
  fechaLimite?: Date;
}

/**
 * Middleware para validar los campos a actualizar en la peticion
 *
 * @param campos Arreglo de strings que representa los campos que se van a actualizar
 * @param body Objeto que se recibe en la peticion `req.body` y que contiene los datos
 *
 * La funcion se encarga de validar los datos pasandolos como parametros y despues iterando
 * cada uno para validar que no sean de tipo `undefined` o vacios.
 * Si alguno de estos datos es invalido se lanza un error y termina la ejecucion de la ruta
 */

export const actualizarCampos = (campos: string[], body: TareaBody) => {
  for (const campo of campos) {
    const valor = body[campo as keyof TareaBody];
    if (valor !== undefined && valor.toString().trim() === "") {
      throw new Error(`El campo ${campo} no puede estar vacio`);
    }
  }
};
