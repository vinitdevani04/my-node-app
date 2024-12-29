const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controller/orderController");

orderRoutes.post("/create", orderController.createOrder);
orderRoutes.get("/orders", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.delete("/:id", orderController.deleteOrder);
orderRoutes.put("/:id/oderstatus", orderController.changeOrderStatus);
orderRoutes.put("/:id/verifiedPayment", orderController.updateVerifiedPaymentStatus);
orderRoutes.post("/search", orderController.getOrdersByEmail);

module.exports = orderRoutes;