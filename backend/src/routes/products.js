import express from "express";

import productsController from "../controllers/productsController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

//This endpoint is used to get all the products and to create a new product
router.route("/")
  .get(productsController.getProducts)
  .post(upload.array("images"), productsController.createProduct);

router.route("/search").post(productsController.searchProductbyname);
router.route("/count").get(productsController.countProducts);
router.route("/searchByCategory").post(productsController.searchByCategory);
router.route("/searchByBrand").post(productsController.searchByBrand);
router.route("/searchByPriceRange").post(productsController.searchByPriceRange);

router.route("/searchByStockAvailability").post(productsController.searchByStockAvailability);
router.route("/searchByColor").post(productsController.searchByColor);
router.route("/searchBySize").post(productsController.searchBySize);

router.route("/searchByMainFeatures").post(productsController.searchByMainFeatures);

router.route("/:id")
.put(upload.array("images"), productsController.updateProduct)
.delete(productsController.deleteProduct)
.get(productsController.getProductById);

export default router;