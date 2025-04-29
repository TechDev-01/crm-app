import express from 'express';
import router from './routes/clientes.routes';
import authRouter from './routes/auth.routes';
import activitiesRouter from './routes/actividad.routes';
import tasksRouter from './routes/tareas.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

// Routes
app.use("/api", tasksRouter)
app.use("/api", activitiesRouter);;
app.use("/api/auth", authRouter);
app.use("/api", router);

export default app;