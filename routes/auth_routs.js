const express = require("express");
const authRoutes = express.Router();
const authController = require("../controller/authController");

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/users", authController.getAllUser);
authRoutes.delete('/delete', authController.deleteUser);
authRoutes.post('/deposit', authController.walletDeposit);
authRoutes.post('/depositverified', authController.verifyDeposit);
authRoutes.post('/getAllTransection', authController.getTransactions);

module.exports = authRoutes;