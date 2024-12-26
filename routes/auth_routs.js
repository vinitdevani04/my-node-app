const express = require("express");
const authRoutes = express.Router();
const authController = require("../controller/authController");

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/users", authController.getAllUser);
authRoutes.delete('/delete', authController.deleteUser);

module.exports = authRoutes;