import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
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

// Pantalla de inicio de sesión de clientes.
export const IniciarSesionPantalla = ({ navigation }) => {
  const { iniciarSesion } = useAutenticacion();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const validar = () => {
    const nuevosErrores = {};
    if (!validarCorreo(correo)) nuevosErrores.correo = "Correo electrónico inválido";
    if (!contrasena) nuevosErrores.contrasena = "La contraseña es obligatoria";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarIniciarSesion = async () => {
    if (!validar()) return;
    setEnviando(true);
    try {
      await iniciarSesion(correo, contrasena);
    } catch (error) {
      Alert.alert("No se pudo iniciar sesión", error.message);
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
            <Logo tamano={72} />
            <Text style={estilos.titulo}>Iniciar sesión</Text>
            <Text style={estilos.subtitulo}>Accede a tu cuenta para continuar</Text>
          </View>

          <CampoTexto
            etiqueta="Correo electrónico"
            valor={correo}
            onCambiar={setCorreo}
            tipoTeclado="email-address"
            error={errores.correo}
          />
          <CampoTexto
            etiqueta="Contraseña"
            valor={contrasena}
            onCambiar={setContrasena}
            secreto
            error={errores.contrasena}
          />

          <View style={estilos.filaRecordarme}>
            <Switch
              value={recordarme}
              onValueChange={setRecordarme}
              trackColor={{ true: colores.primario }}
            />
            <Text style={estilos.textoRecordarme}>Recordarme</Text>
          </View>

          <Text
            style={estilos.enlace}
            onPress={() => navigation.navigate("RecuperarContrasena")}
          >
            ¿Olvidaste tu contraseña?
          </Text>

          <Boton
            estilo={estilos.espacioBoton}
            cargando={enviando}
            onPress={manejarIniciarSesion}
          >
            Iniciar Sesión
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
  encabezado: { alignItems: "center", marginBottom: 24 },
  titulo: { fontSize: 22, fontWeight: "700", color: colores.texto, marginTop: 12 },
  subtitulo: { fontSize: 13, color: colores.textoClaro, marginTop: 4 },
  filaRecordarme: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  textoRecordarme: { marginLeft: 8, fontSize: 13, color: colores.texto },
  enlace: {
    fontSize: 13,
    color: colores.primario,
    fontWeight: "600",
    marginBottom: 24,
  },
  espacioBoton: { marginBottom: 18 },
  enlaceVolver: {
    textAlign: "center",
    fontSize: 13,
    color: colores.textoClaro,
  },
});

export default IniciarSesionPantalla;
