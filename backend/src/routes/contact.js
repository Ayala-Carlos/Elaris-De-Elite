import express from "express"
import contactController from "../controllers/contactController.js";

const router = express.Router();

//(api/contact/)
router.route("/")
.post(contactController.sendMessage)

export default router;
