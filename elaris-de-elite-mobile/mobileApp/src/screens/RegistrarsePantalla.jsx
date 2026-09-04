import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton.jsx";
import { CampoTexto } from "../components/CampoTexto.jsx";
import { Logo } from "../components/Logo.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
const validarTelefono = (telefono) => /^\d{7,15}$/.test(telefono.replace(/\s/g, ""));

const DATOS_INICIALES = {
  nombreCompleto: "",
  correo: "",
  contrasena: "",
  telefono: "",
  pais: "",
  estado: "",
  ciudad: "",
  direccion: "",
};

// Pantalla de registro de nuevos clientes.
export const RegistrarsePantalla = ({ navigation }) => {
  const { registrarse } = useAutenticacion();

  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const actualizarCampo = (campo) => (valor) =>
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombreCompleto.trim()) nuevosErrores.nombreCompleto = "El nombre es obligatorio";
    if (!validarCorreo(datos.correo)) nuevosErrores.correo = "Correo electrónico inválido";
    if (!datos.contrasena || datos.contrasena.length < 8)
      nuevosErrores.contrasena = "Mínimo 8 caracteres";
    if (datos.telefono && !validarTelefono(datos.telefono))
      nuevosErrores.telefono = "Número de teléfono inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarRegistro = async () => {
    if (!validar()) return;
    setEnviando(true);
    try {
      await registrarse({
        name: datos.nombreCompleto.trim(),
        email: datos.correo.trim(),
        password: datos.contrasena,
        phoneNumber: datos.telefono,
        // País, estado, ciudad y dirección se capturan en el formulario
        // para completar el perfil del cliente en el futuro.
        pais: datos.pais,
        estado: datos.estado,
        ciudad: datos.ciudad,
        direccion: datos.direccion,
      });
      Alert.alert(
        "Revisa tu correo",
        "Te enviamos un código de verificación para activar tu cuenta.",
      );
      navigation.navigate("IniciarSesion");
    } catch (error) {
      Alert.alert("No se pudo completar el registro", error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
          <View style={estilos.encabezado}>
            <Logo tamano={64} />
            <Text style={estilos.titulo}>Registrarse</Text>
            <Text style={estilos.subtitulo}>Crea tu cuenta para continuar</Text>
          </View>

          <CampoTexto
            etiqueta="Nombre completo"
            valor={datos.nombreCompleto}
            onCambiar={actualizarCampo("nombreCompleto")}
            autoCapitalizar="words"
            error={errores.nombreCompleto}
          />
          <CampoTexto
            etiqueta="Correo electrónico"
            valor={datos.correo}
            onCambiar={actualizarCampo("correo")}
            tipoTeclado="email-address"
            error={errores.correo}
          />

          <View style={estilos.filaDoble}>
            <CampoTexto
              etiqueta="Contraseña"
              valor={datos.contrasena}
              onCambiar={actualizarCampo("contrasena")}
              secreto
              error={errores.contrasena}
              estilo={estilos.mitad}
            />
            <CampoTexto
              etiqueta="N. teléfono"
              valor={datos.telefono}
              onCambiar={actualizarCampo("telefono")}
              tipoTeclado="phone-pad"
              error={errores.telefono}
              estilo={estilos.mitad}
            />
          </View>

          <View style={estilos.filaDoble}>
            <CampoTexto
              etiqueta="País"
              valor={datos.pais}
              onCambiar={actualizarCampo("pais")}
              estilo={estilos.mitad}
            />
            <CampoTexto
              etiqueta="Estado"
              valor={datos.estado}
              onCambiar={actualizarCampo("estado")}
              estilo={estilos.mitad}
            />
          </View>

          <CampoTexto
            etiqueta="Ciudad"
            valor={datos.ciudad}
            onCambiar={actualizarCampo("ciudad")}
          />
          <CampoTexto
            etiqueta="Dirección"
            valor={datos.direccion}
            onCambiar={actualizarCampo("direccion")}
          />

          <Boton estilo={estilos.espacioBoton} cargando={enviando} onPress={manejarRegistro}>
            Registrarse
          </Boton>

          <Text style={estilos.enlaceVolver} onPress={() => navigation.goBack()}>
            ← Volver al inicio
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, paddingTop: 16 },
  encabezado: { alignItems: "center", marginBottom: 20 },
  titulo: { fontSize: 20, fontWeight: "700", color: colores.texto, marginTop: 10 },
  subtitulo: { fontSize: 13, color: colores.textoClaro, marginTop: 4 },
  filaDoble: { flexDirection: "row", justifyContent: "space-between" },
  mitad: { width: "48%" },
  espacioBoton: { marginTop: 8, marginBottom: 18 },
  enlaceVolver: { textAlign: "center", fontSize: 13, color: colores.textoClaro },
});

export default RegistrarsePantalla;
