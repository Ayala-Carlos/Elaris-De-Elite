import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { servicioAutenticacion } from "../services/servicioAutenticacion.js";
import { servicioClientes } from "../services/servicioClientes.js";

const CLAVE_ALMACENAMIENTO = "@elaris_de_elite_cliente";

export const ContextoAutenticacion = createContext(null);

// Provee el estado de sesión (cliente autenticado) a toda la app,
// y persiste al cliente en el dispositivo para no perder la sesión
// al cerrar la aplicación.
export const ProveedorAutenticacion = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);
        if (guardado) setCliente(JSON.parse(guardado));
      } catch (error) {
        console.log("No se pudo recuperar la sesión guardada:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarSesion();
  }, []);

  const persistirCliente = async (nuevoCliente) => {
    setCliente(nuevoCliente);
    try {
      if (nuevoCliente) {
        await AsyncStorage.setItem(
          CLAVE_ALMACENAMIENTO,
          JSON.stringify(nuevoCliente),
        );
      } else {
        await AsyncStorage.removeItem(CLAVE_ALMACENAMIENTO);
      }
    } catch (error) {
      console.log("No se pudo guardar la sesión:", error);
    }
  };

  const iniciarSesion = async (email, password) => {
    await servicioAutenticacion.iniciarSesion(email, password);
    let datosCliente = { email };
    try {
      datosCliente = await servicioClientes.buscarPorCorreo(email);
    } catch (error) {
      // Si no se puede obtener el perfil completo, se continúa con lo básico.
      console.log("No se pudo obtener el perfil del cliente:", error);
    }
    await persistirCliente(datosCliente);
    return datosCliente;
  };

  const registrarse = (datos) => servicioAutenticacion.registrarse(datos);

  const verificarCodigoRegistro = (codigo) =>
    servicioAutenticacion.verificarCodigoRegistro(codigo);

  const solicitarCodigoRecuperacion = (email) =>
    servicioAutenticacion.solicitarCodigoRecuperacion(email);

  const verificarCodigoRecuperacion = (codigo) =>
    servicioAutenticacion.verificarCodigoRecuperacion(codigo);

  const restablecerContrasena = (nuevaContrasena, confirmarContrasena) =>
    servicioAutenticacion.restablecerContrasena(
      nuevaContrasena,
      confirmarContrasena,
    );

  const cerrarSesion = async () => {
    try {
      await servicioAutenticacion.cerrarSesion();
    } finally {
      await persistirCliente(null);
    }
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        cliente,
        cargando,
        haIniciadoSesion: Boolean(cliente),
        iniciarSesion,
        registrarse,
        verificarCodigoRegistro,
        solicitarCodigoRecuperacion,
        verificarCodigoRecuperacion,
        restablecerContrasena,
        cerrarSesion,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export default ContextoAutenticacion;
