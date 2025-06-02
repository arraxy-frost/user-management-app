import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware)

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandlerMiddleware)

export default app;