import express from "express"
import reviewsController from "../controllers/reviewsController.js";

//Router() nos ayuda a colocar los métodos que tendrá el endpoint
const router = express.Router();

//(api/reviews/)
router.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.createReviews)

//Definimos los métodos para el endpoint que incluye un parámetro dinámico ":id". Este parámetro se utiliza para identificar un recurso específico, como un producto en este caso. Los métodos PUT y DELETE se utilizan para actualizar y eliminar un recurso específico identificado por su ID, respectivamente. 
//(api/reviews/:id)
router.route("/:id")
.put(reviewsController.updateReviews)
.delete(reviewsController.deleteReviews)

export default router;