import { Schema, model, Types } from "mongoose";

const actividadSchema = new Schema ({
    tipo: {
        type: String,
        enum: ["llamada", "reunion", "correo"],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cliente: {
        type: Types.ObjectId,
        ref: "Cliente",
        required: true
    },
}, {
    timestamps: true,
});

const Actividad = model("Actividad", actividadSchema);
export default Actividad;