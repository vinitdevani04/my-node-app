const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controller/orderController");

orderRoutes.post("/create", orderController.createOrder);
orderRoutes.get("/getAllOrders", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.put("/:id", orderController.updateOrderStatus);
orderRoutes.delete("/:id", orderController.deleteOrder);
orderRoutes.patch("/:id/status", orderController.changeOrderStatus); // New route for changing order status

module.exports = orderRoutes;