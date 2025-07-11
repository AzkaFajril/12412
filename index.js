import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./api/routes/userRoutes.js";
import cartRoutes from "./api/routes/cartRoutes.js";
import menuRoutes from "./api/routes/menuRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6001;

app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/users", userRoutes);
app.use("/carts", cartRoutes);
app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
