import { Schema, model, Types } from "mongoose";

const Gastos = new Schema({
  descripcion: {
    type: String,
    lowercase: true,
    required: true,
  },
  metodoPago: {
    type: String,
    enum: ["tarjeta de credito", "tarjeta de debito" ,"efectivo"],
    required: true,
    lowercase: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["renta", "marketing", "sueldos", "servicios", "otros"],
    lowercase: true,
  },
  usuario: {
    type: Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  proveedor: {
    type: String,
    trim: true,
  },
  comprobanteUrl: {
    type: String,
  },
});

const Gasto = model("Gasto", Gastos);
export default Gasto;
