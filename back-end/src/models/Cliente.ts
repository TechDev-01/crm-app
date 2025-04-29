import { Schema } from "mongoose";
import { model } from "mongoose";

const clientSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    empresa: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Cliente = model("Cliente", clientSchema);

export default Cliente;
