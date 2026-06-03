import express from "express"

import registerCustomersController from "../controllers/registersCustomers.js";

const router = express.Router();

router.route("/").post(registerCustomersController.register);
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCode);

export default router;