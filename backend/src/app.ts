import express from "express";
import cors from "cors";
import authRoutes from "../src/modules/auth/auth.routes";
import heroRoutes from "../src/modules/heroes/heroes.routes";
import { authenticateToken } from "./core/middlewares/auth.middleware";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(authenticateToken);
app.use("/api/heroes", heroRoutes);

// Ruta de prueba (Health check)
app.get("/ping", (req, res) => {
  res.send("pong 🏓 - El servidor de MinData está vivo");
});

// Aquí irán tus rutas de Heroes y Auth después
// app.use('/api/heroes', heroRoutes);

export default app;
