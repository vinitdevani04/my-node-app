const express = require("express");
const authRoutes = express.Router();
const authController = require("../controller/authController");

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/users", authController.getAllUser);
authRoutes.delete('/delete', authController.deleteUser);
authRoutes.put('/wallet-update', authController.walletUpdate);
authRoutes.put('/welcome-bonus', authController.changeWelcomeBonus);

module.exports = authRoutes;