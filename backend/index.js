import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./api/users/userRoutes.js";
import songRoutes from "./api/songs/songRoutes.js";
import interpretationRoutes from "./api/interpretations/interpretationRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("You've hit Melosofia's server!");
});

userRoutes(app);
songRoutes(app);
interpretationRoutes(app);
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
