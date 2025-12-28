import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4250;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});