import app from "./app.js";
import "./database.js"

//Create the function
//That is responsible for running the server

//Uses a try-catch block to handle any errors that may occur when starting the server. If the server starts successfully, a message is displayed in the console indicating that the server is listening on port 4000. If an error occurs, it is caught and a message is displayed in the console with the details of the error.
async function main() {
    try {
        app.listen(4000);
        console.log("Servidor escuchando en el puerto 4000");
        //Todo funciona
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

//Call the function to start the server
main();