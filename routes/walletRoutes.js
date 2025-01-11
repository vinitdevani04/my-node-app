const express = require("express");
const router = express.Router();
const {
    addTransaction,
    verifyTransaction,
    getUserTransactions,
    getAllTransactions
} = require("../controller/walletController");

// Add a transaction
router.post("/add-transaction", addTransaction);

// Verify a transaction
router.post("/verify-transaction", verifyTransaction);

// Get all transactions for a specific user
router.post("/get-user-transactions", getUserTransactions);

// Get all users and their transactions
router.get("/get-all-transactions", getAllTransactions);

module.exports = router;
