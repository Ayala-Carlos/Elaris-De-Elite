import express from "express";
import administratorController from "../controllers/administratorsController.js";

const router = express.Router();

// CRUD
// GET /api/administrators/
router.route("/").get(administratorController.getAdministrators);

// PUT /api/administrators/:id  |  DELETE /api/administrators/:id
router.route("/:id")
  .put(administratorController.updateAdministrator)
  .delete(administratorController.deleteAdministrator);

export default router;
