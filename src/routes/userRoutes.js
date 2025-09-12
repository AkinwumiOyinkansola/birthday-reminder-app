const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Add new user
router.post("/add", userController.addUser);

// Get all users
router.get("/", userController.getUsers);

module.exports = router;  // ✅ must be module.exports (with "s")
