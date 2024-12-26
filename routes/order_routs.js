const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controller/orderController");

orderRoutes.post("/create", orderController.createOrder);
orderRoutes.get("/orders", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.delete("/:id", orderController.deleteOrder);
orderRoutes.patch("/:id/oderstatus", orderController.changeOrderStatus);
orderRoutes.patch("/:id/verifiedPayment", orderController.updateVerifiedPaymentStatus);
orderRoutes.get("/search", orderController.getOrdersByEmailAndPhone);

module.exports = orderRoutes;