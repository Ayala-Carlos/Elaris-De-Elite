import express from "express";
import registerAdminController from "../controllers/registerAdminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// Only an already logged-in administrator can create another administrator.
router.route("/").post(adminAuth, registerAdminController.register);

export default router;