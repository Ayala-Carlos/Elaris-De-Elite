import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

// (api/orders/)
router
  .route("/")
  .get(ordersController.getAllOrders)
  .post(ordersController.createOrder);

// (api/orders/:id)
router
  .route("/:id")
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder)
  .get(ordersController.getOrderById);

export default router;
