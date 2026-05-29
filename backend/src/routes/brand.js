import express from "express"
import brandController from "../controllers/brandController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.get(brandController.getBrands)
.post(upload.array("images"), brandController.createBrand)
//single: upload 1 image
//array: multiple files (any kind of files)

//Additional endpoints for specific brand operations
router.route("/search")
.post(brandController.searchBrand)
router.route("/count")
.get(brandController.countBrands)      

router.route("/:id")
.put(upload.array("images"), brandController.updateBrand)
.delete(brandController.deleteBrand);

export default router;
