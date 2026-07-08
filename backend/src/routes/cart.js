import express from "express"
import cartController from "../controllers/cartController.js";
import adminAuth from "../middlewares/adminAuth.js";
import customerAuth from "../middlewares/customerAuth.js";

//Router() helps us to define the methods that our endpoint will have

const router = express.Router();

//(api/carts/)
router.route("/")
.get(adminAuth, cartController.getAllCarts)
.post(customerAuth, cartController.createCart)

//(api/carts/customer/:customerId) - Must be defined before "/:id" so express doesn't treat "customer" as an id
router.route("/customer/:customerId")
.get(customerAuth, cartController.getCartByCustomer)

//We define the methods for the endpoint that includes a dynamic parameter ":id". This parameter is used to identify a specific resource, such as a product in this case. The PUT and DELETE methods are used to update and delete a specific resource identified by its ID, respectively.
//(api/carts/:id)
router.route("/:id")
.put(customerAuth, cartController.updateCart)
.delete(customerAuth, cartController.deleteCart)
.get(customerAuth, cartController.getCartById)

export default router;