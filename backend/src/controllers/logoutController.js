// Controlador para manejar el cierre de sesión 
const logoutController = {}

// Función para manejar la ruta de cierre de sesión, que es una ruta POST porque se envían datos en el cuerpo de la solicitud, y le asignamos el controlador que se va a encargar de manejar esta ruta
logoutController.logout = async (req, res) => {
    try {
        // Para cerrar la sesión, eliminamos la cookie que contiene el token de autenticación.
        // Limpiamos ambas cookies posibles (admin/cliente) ya que este mismo endpoint es usado por los dos frontends.
        res.clearCookie("adminAuthCookie")
        res.clearCookie("customerAuthCookie")

        // Después de eliminar la cookie, enviamos una respuesta al cliente indicando que la sesión se ha cerrado correctamente
        return res.status(200).json({message: "Sesión cerrada"})
    } catch (error) {
        // En caso de error, enviamos una respuesta de error
        return res.status(500).json({message: "Error al cerrar sesión"})
    }
}

export default logoutController;