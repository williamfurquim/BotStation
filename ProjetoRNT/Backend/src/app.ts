import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

// Configuração básica do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando em ${PORT}`));