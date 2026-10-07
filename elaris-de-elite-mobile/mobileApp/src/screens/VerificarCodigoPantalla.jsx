import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton.jsx";
import { CampoTexto } from "../components/CampoTexto.jsx";
import { Logo } from "../components/Logo.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";
import { validarCodigo } from "../utils/validaciones.js";

// Pantalla que sigue al registro: el cliente escribe el código que recibió
// por correo para activar su cuenta (la cuenta no existe hasta verificarlo).
export const VerificarCodigoPantalla = ({ navigation, route }) => {
  const { verificarCodigoRegistro } = useAutenticacion();
  const correo = route.params?.correo;

  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const manejarVerificar = async () => {
    const errorCodigo = validarCodigo(codigo);
    setError(errorCodigo);
    if (errorCodigo) return;

    setEnviando(true);
    try {
      await verificarCodigoRegistro(codigo.trim());
      Alert.alert("Cuenta verificada", "Ya puedes iniciar sesión.");
      navigation.navigate("IniciarSesion");
    } catch (errorApi) {
      Alert.alert("No se pudo verificar la cuenta", errorApi.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
        <Logo tamano={64} />
        <Text style={estilos.titulo}>Verifica tu correo</Text>
        <Text style={estilos.subtitulo}>
          {correo
            ? `Escribe el código de 6 caracteres que enviamos a ${correo}.`
            : "Escribe el código de 6 caracteres que enviamos a tu correo."}
        </Text>

        <CampoTexto
          etiqueta="Código de verificación"
          valor={codigo}
          onCambiar={setCodigo}
          error={error}
        />
        <Boton cargando={enviando} onPress={manejarVerificar}>
          Verificar cuenta
        </Boton>

        <Text style={estilos.enlaceVolver} onPress={() => navigation.goBack()}>
          ← Volver
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, alignItems: "center" },
  titulo: { fontSize: 20, fontWeight: "700", color: colores.texto, marginTop: 10 },
  subtitulo: {
    fontSize: 13,
    color: colores.textoClaro,
    marginTop: 4,
    marginBottom: 20,
    textAlign: "center",
  },
  enlaceVolver: { textAlign: "center", fontSize: 13, color: colores.textoClaro, marginTop: 16 },
});

export default VerificarCodigoPantalla;
