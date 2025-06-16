import express from 'express';
import router from './routes/clientes.routes';
import authRouter from './routes/auth.routes';
import activitiesRouter from './routes/actividad.routes';
import tasksRouter from './routes/tareas.routes';
import facturaRouter from './routes/facturas.routes';
import gastosRouter from './routes/gastos.routes';
import reportRouter from './routes/reportes.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(cookieParser());

// Routes
app.use("/api/reportes", reportRouter);
app.use("/api/gastos", gastosRouter);
app.use("/api/facturas", facturaRouter);
app.use("/api/tareas", tasksRouter)
app.use("/api/actividades", activitiesRouter);;
app.use("/api/auth", authRouter);
app.use("/api/clientes", router);

export default app;