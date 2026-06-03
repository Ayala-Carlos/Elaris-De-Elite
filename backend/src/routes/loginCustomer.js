//Importamos express para crear el router y poder definir las rutas de nuestro endpoint
import express from "express";

//Importamos el controlador que se va a ocupar para manejar las rutas de este endpoint
import loginCustomerController from "../controllers/loginCustomerController.js";

//Creamos el router para definir las rutas de este endpoint
const router = express.Router();

//Definimos la ruta para el login de clientes, que es una ruta POST porque se envían datos en el cuerpo de la solicitud, y le asignamos el controlador que se va a encargar de manejar esta ruta
router.route("/").post(loginCustomerController.login);

//Exportamos el router para poder usarlo en el archivo principal de nuestro backend (app.js)
export default router;