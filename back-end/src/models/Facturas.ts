import { Schema, Types, model } from "mongoose";

const Facturas = new Schema({
  descripcion: {
    type: String,
    lowercase: true,
    required: true,
  },
  metodoPago: {
    type: String,
    enum: ["tarjeta de credito", "efectivo"],
    required: true,
    lowercae: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    required: true,
    enum: ["pagada", "pendiente"],
  },
  cliente: {
    type: Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
});

const Factura = model("Factura", Facturas);
export default Factura;
