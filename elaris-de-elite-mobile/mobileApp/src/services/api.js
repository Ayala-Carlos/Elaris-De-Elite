// Cliente base para consumir el backend de Élaris de Élite.
// En un dispositivo o emulador físico "localhost" no apunta al backend,
// por eso la URL se toma de una variable de entorno pública de Expo,
// con un valor de respaldo para desarrollo local.
const URL_API = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

export async function solicitudApi(ruta, opciones = {}) {
  const esFormData = opciones.body instanceof FormData;

  const respuesta = await fetch(`${URL_API}${ruta}`, {
    ...opciones,
    headers: esFormData
      ? opciones.headers
      : { "Content-Type": "application/json", ...(opciones.headers || {}) },
    body:
      opciones.body && !esFormData
        ? JSON.stringify(opciones.body)
        : opciones.body,
  });

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(datos.message || "Ocurrió un error al conectar con el servidor");
  }

  return datos;
}

export default solicitudApi;
