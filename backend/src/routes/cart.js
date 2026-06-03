import express from "express"
import cartController from "../controllers/cartController.js";

//Router() helps us to define the methods that our endpoint will have

const router = express.Router();

//(api/carts/)
router.route("/")
.get(cartController.getAllCarts)
.post(cartController.createCart)

//We define the methods for the endpoint that includes a dynamic parameter ":id". This parameter is used to identify a specific resource, such as a product in this case. The PUT and DELETE methods are used to update and delete a specific resource identified by its ID, respectively.
//(api/carts/:id)
router.route("/:id")
.put(cartController.updateCart)
.delete(cartController.deleteCart)
.get(cartController.getCartById)

export default router;