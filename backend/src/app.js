const express = require('express');

const healthRoutes = require("./routes/health.routes");
const receiptRoutes = require("./routes/receipt.routes");

const app = express();

// Middleware
app.use(express.json());

// Mounting routes
app.use("/health", healthRoutes);
app.use("/api/receipt", receiptRoutes);

module.exports = app;