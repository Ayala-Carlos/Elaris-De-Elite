import express from "express"
import customersController from "../controllers/customersConroller.js";


const router = express.Router();

router.route("/")
.get(customersController.getCustomers)

router.route("/count")
.get(customersController.countCustomers)

router.route("/searchByEmail")
.post(customersController.searchCustomerByEmail)

router.route("/:id")
.put(customersController.updateCustomer)
.delete(customersController.deleteCustomer)

export default router;
