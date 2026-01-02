import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import Auth from "./Routes/Authentication/Auth.js";
import FetchProperty from "./Routes/Property/FetchingProperty.js";
import UpdateProperty from "./Routes/Property/UpdatingProperty.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ROUTES
app.use("/", Auth);
app.use("/", UpdateProperty);
app.use("/", FetchProperty);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});