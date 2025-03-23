import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to Server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`\nServer is running at port http://localhost:${port}`);
});
