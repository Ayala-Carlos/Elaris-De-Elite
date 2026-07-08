import express from "express"
import discountCodesController from "../controllers/discountCodesController.js";
import adminAuth from "../middlewares/adminAuth.js";
import customerAuth from "../middlewares/customerAuth.js";

const router = express.Router();

//(api/discountCodes/)
router.route("/")
.get(adminAuth, discountCodesController.getDiscountCodes)
.post(adminAuth, discountCodesController.createDiscountCode)

//Additional endpoints for specific discount code operations

//A logged-in customer checks/applies a code from the cart
router.route("/searchByCode").post(customerAuth, discountCodesController.searchByCodeAndIsAvailable)

router.route("/count").get(adminAuth, discountCodesController.countDiscountCodes)

//Define the endpoints for update and delete a discount code, the id of the discount code is send in the url as a parameter
//(api/discountCodes/:id)
router.route("/:id")
.put(adminAuth, discountCodesController.updateDiscountCode)
.delete(adminAuth, discountCodesController.deleteDiscountCode)
.get(adminAuth, discountCodesController.getDiscountCodeById)

export default router;