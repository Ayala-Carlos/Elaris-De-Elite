import express from "express"
import administratorController from "../controllers/administratorsController.js";

const router = express.Router();

//(api/administrators/)
router.route("/")
.get(administratorController.getAdministrators)

//Define the endpoints for update and delete a category, the id of the category is send in the url as a parameter
//(api/administrators/:id)
router.route("/:id")
.put(administratorController.updateAdministrator)
.delete(administratorController.deleteAdministrator)

export default router;