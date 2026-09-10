import express from "express"
import wompiController from "../controllers/wompiController.js";
import customerAuth from "../middlewares/customerAuth.js";

//Router() allow us to place the methods that the endpoint will have

const router = express.Router();

router.route("/token").post(wompiController.generateToken)
router.route("/paymentTest").post(wompiController.paymentTest)
router.route("/payment3DS").post(wompiController.payment3DS)
// Pago de prueba (sandbox) desde la app: solo un cliente autenticado puede
// pagar, y orquesta token -> tokenización de tarjeta -> transacción TokenizadaSin3Ds.
router.route("/pay").post(customerAuth, wompiController.payWithCard)

export default router;