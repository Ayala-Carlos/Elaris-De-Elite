// Validaciones reutilizables para los formularios de la app.
// Cada función devuelve un mensaje de error (string) o null si el valor es válido.

export const EDAD_MINIMA = 18;
export const EDAD_MAXIMA = 100;

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^\d{10}$/;
const REGEX_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;

export const validarCorreo = (correo) => {
  if (!correo?.trim()) return "El correo es obligatorio";
  if (!REGEX_CORREO.test(correo.trim())) return "Correo electrónico inválido";
  return null;
};

export const validarNombre = (nombre) => {
  const limpio = nombre?.trim() ?? "";
  if (!limpio) return "El nombre es obligatorio";
  if (limpio.length < 3 || limpio.length > 50) return "El nombre debe tener entre 3 y 50 caracteres";
  return null;
};

export const validarContrasena = (contrasena) => {
  if (!contrasena) return "La contraseña es obligatoria";
  if (contrasena.length < 8 || contrasena.length > 20) {
    return "La contraseña debe tener entre 8 y 20 caracteres";
  }
  return null;
};

// El teléfono es opcional salvo que se indique lo contrario.
export const validarTelefono = (telefono, { obligatorio = false } = {}) => {
  const limpio = telefono?.trim() ?? "";
  if (!limpio) return obligatorio ? "El teléfono es obligatorio" : null;
  if (!REGEX_TELEFONO.test(limpio)) return "El teléfono debe tener 10 dígitos";
  return null;
};

export const validarCampoObligatorio = (valor, nombreCampo) =>
  valor?.trim() ? null : `${nombreCampo} es obligatorio`;

// Calcula la edad en años a partir de una fecha AAAA-MM-DD, o null si la fecha no es válida.
export const calcularEdad = (fecha) => {
  const coincidencia = REGEX_FECHA.exec(fecha?.trim() ?? "");
  if (!coincidencia) return null;

  const [, anio, mes, dia] = coincidencia.map(Number);
  const nacimiento = new Date(anio, mes - 1, dia);
  const esFechaReal =
    nacimiento.getFullYear() === anio &&
    nacimiento.getMonth() === mes - 1 &&
    nacimiento.getDate() === dia;
  if (!esFechaReal) return null;

  const hoy = new Date();
  if (nacimiento > hoy) return null;

  let edad = hoy.getFullYear() - anio;
  if (hoy < new Date(hoy.getFullYear(), mes - 1, dia)) edad -= 1;
  return edad;
};

export const validarFechaNacimiento = (fecha) => {
  if (!fecha?.trim()) return "La fecha de nacimiento es obligatoria";
  const edad = calcularEdad(fecha);
  if (edad === null) return "Usa una fecha válida con el formato AAAA-MM-DD";
  if (edad < EDAD_MINIMA || edad > EDAD_MAXIMA) {
    return `Debes tener entre ${EDAD_MINIMA} y ${EDAD_MAXIMA} años`;
  }
  return null;
};

// Código de verificación enviado por correo (6 caracteres hexadecimales).
export const validarCodigo = (codigo) => {
  if (!codigo?.trim()) return "El código es obligatorio";
  if (!/^[0-9a-fA-F]{6}$/.test(codigo.trim())) return "El código debe tener 6 caracteres";
  return null;
};
