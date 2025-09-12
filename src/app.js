const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // support form submissions

// Serve static files (frontend UI)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", userRoutes);

module.exports = app;
