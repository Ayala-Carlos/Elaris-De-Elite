import express from "express"
import marketingCampaingsController from "../controllers/marketingCampaingsController.js";

const router = express.Router();

//(api/marketingCampaings/)
router.route("/")
.get(marketingCampaingsController.getMarketingCampaings)
.post(marketingCampaingsController.createMarketingCampaings)

//Additional endpoints for specific discount code operations

router.route("/searchByCode").post(marketingCampaingsController.getMarketingCampaignById)
//search for name of the campaign
router.route("/searchByName").post(marketingCampaingsController.searchByName)
//search for campaigns with low budget
router.route("/lowBudget").post(marketingCampaingsController.lowBudget)
//search for campaigns with assigned budget between a range
router.route("/searchByBudgetRange").post(marketingCampaingsController.searchByBudgetRange)

router.route("/count").get(marketingCampaingsController.countMarketingCampaings)

//Define the endpoints for update and delete a discount code, the id of the discount code is send in the url as a parameter
//(api/discountCodes/:id)
router.route("/:id")
.put(marketingCampaingsController.updateMarketingCampaings)
.delete(marketingCampaingsController.deleteMarketingCampaings)

export default router;