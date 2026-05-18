import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.clientUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
