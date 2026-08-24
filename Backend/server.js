require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chartRoutes = require("./routes/chartRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ==========================
// MIDDLEWARE
// ==========================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// UPLOADS
// ==========================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// API ROUTES
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

// ==========================
// HOME TEST
// ==========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Warehouse Backend Running"
  });
});

// ==========================
// 404
// ==========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found"
  });
});

// ==========================
// ERROR HANDLER
// ==========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// ==========================
// SERVER START
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});