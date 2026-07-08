import express from "express";
import administratorController from "../controllers/administratorsController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// CRUD - only reachable by an already logged-in administrator
// GET /api/administrators/
router.route("/").get(adminAuth, administratorController.getAdministrators);

// PUT /api/administrators/:id  |  DELETE /api/administrators/:id
router.route("/:id")
  .put(adminAuth, administratorController.updateAdministrator)
  .delete(adminAuth, administratorController.deleteAdministrator);

export default router;
