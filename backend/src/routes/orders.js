import express from "express";
import ordersController from "../controllers/ordersController.js";
import adminAuth from "../middlewares/adminAuth.js";
import customerAuth from "../middlewares/customerAuth.js";

const router = express.Router();

// (api/orders/)
router
  .route("/")
  .get(adminAuth, ordersController.getAllOrders)
  .post(customerAuth, ordersController.createOrder);

// (api/orders/customer/:customerId) - order history for a given customer.
// Must be defined before "/:id" so express doesn't treat "customer" as an id
router
  .route("/customer/:customerId")
  .get(customerAuth, ordersController.getOrdersByCustomer);

// (api/orders/:id)
router
  .route("/:id")
  .put(adminAuth, ordersController.updateOrder)
  .delete(adminAuth, ordersController.deleteOrder)
  .get(customerAuth, ordersController.getOrderById);

export default router;
