import { Schema, model } from "mongoose";

const tareasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  atencion: {
    type: String,
    enum: ["urgente", "importante", "aplazable"],
    required: true,
    lowercase: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "resuelta"],
    required: true,
    lowercase: true,    
    default: "pendiente"
  },
  fechaLimite: {
    type: Date,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  }
});

const Tareas = model('Tareas', tareasSchema);
export default Tareas;