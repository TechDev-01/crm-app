import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Conectado");
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`)
        });
    })
    .catch(err => {
        console.error("Error al conectar a mongoDB:", err);
    })