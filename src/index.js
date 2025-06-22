import express from "express";
import path from "path";
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(path.resolve("src/public")));

// Register payment routes
app.use(paymentRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
