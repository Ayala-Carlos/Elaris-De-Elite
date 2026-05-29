import express from "express"
import discountCodesController from "../controllers/discountCodesController.js";

const router = express.Router();

//(api/discountCodes/)
router.route("/")
.get(discountCodesController.getDiscountCodes)
.post(discountCodesController.createDiscountCode)

//Additional endpoints for specific discount code operations

router.route("/searchByCode").post(discountCodesController.searchByCodeAndIsAvailable)

router.route("/count").get(discountCodesController.countDiscountCodes)

//Define the endpoints for update and delete a discount code, the id of the discount code is send in the url as a parameter
//(api/discountCodes/:id)
router.route("/:id")
.put(discountCodesController.updateDiscountCode)
.delete(discountCodesController.deleteDiscountCode)

export default router;