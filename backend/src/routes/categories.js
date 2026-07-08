import express from "express"
import categoriesController from "../controllers/categoriesController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

//(api/categories/)
router.route("/")
.get(categoriesController.getCategories)
.post(adminAuth, categoriesController.createCategory)

//Additional endpoints for specific category operations

router.route("/searchByName").post(categoriesController.searchByName)

router.route("/count").get(categoriesController.countCategories)

//Define the endpoints for update and delete a category, the id of the category is send in the url as a parameter
//(api/categories/:id)
router.route("/:id")
.put(adminAuth, categoriesController.updateCategory)
.delete(adminAuth, categoriesController.deleteCategory)

export default router;