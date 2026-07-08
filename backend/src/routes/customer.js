import express from "express"
import customersController from "../controllers/customersConroller.js";
import adminAuth from "../middlewares/adminAuth.js";
import customerAuth from "../middlewares/customerAuth.js";


const router = express.Router();

router.route("/")
.get(adminAuth, customersController.getCustomers)

router.route("/count")
.get(adminAuth, customersController.countCustomers)

router.route("/searchByEmail")
.post(customerAuth, customersController.searchCustomerByEmail)

router.route("/:id")
.put(customerAuth, customersController.updateCustomer)
.delete(adminAuth, customersController.deleteCustomer)

export default router;
