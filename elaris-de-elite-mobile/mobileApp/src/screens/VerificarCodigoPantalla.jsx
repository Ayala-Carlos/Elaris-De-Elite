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

export const VerificarCodigoPantalla = ({ route, navigation }) => {
  const { correo } = route.params || {};
  const { verificarCodigoRegistro } = useAutenticacion();

  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const manejarVerificacion = async () => {
    if (!codigo.trim() || codigo.length < 4) {
      setError("Por favor ingresa un código válido");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      await verificarCodigoRegistro(codigo);
      
      Alert.alert(
        "¡Cuenta verificada!",
        "Tu cuenta ha sido activada con éxito. Ya puedes iniciar sesión.",
      );
      
      navigation.navigate("IniciarSesion");
    } catch (errorAPI) {
      setError(errorAPI.message || "El código es incorrecto o ha expirado.");
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
            <Text style={estilos.titulo}>Verificar Cuenta</Text>
            <Text style={estilos.subtitulo}>
              Ingresa el código que enviamos a {correo || "tu correo"}
            </Text>
          </View>

          <CampoTexto
            etiqueta="Código de verificación"
            valor={codigo}
            onCambiar={(texto) => {
              setCodigo(texto);
              setError("");
            }}
            tipoTeclado="number-pad"
            error={error}
          />

          <Boton estilo={estilos.espacioBoton} cargando={enviando} onPress={manejarVerificacion}>
            Confirmar código
          </Boton>

          <Text style={estilos.enlaceVolver} onPress={() => navigation.goBack()}>
            ← Volver al registro
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, paddingTop: 16 },
  encabezado: { alignItems: "center", marginBottom: 30, marginTop: 20 },
  titulo: { fontSize: 20, fontWeight: "700", color: colores.texto, marginTop: 10 },
  subtitulo: { fontSize: 13, color: colores.textoClaro, marginTop: 4, textAlign: "center" },
  espacioBoton: { marginTop: 12, marginBottom: 18 },
  enlaceVolver: { textAlign: "center", fontSize: 13, color: colores.textoClaro },
});

export default VerificarCodigoPantalla;