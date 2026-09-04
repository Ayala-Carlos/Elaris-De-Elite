import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton.jsx";
import { CampoTexto } from "../components/CampoTexto.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";

const PASOS = { CORREO: "correo", CODIGO: "codigo", NUEVA_CONTRASENA: "nuevaContrasena" };

// Pantalla de recuperación de contraseña en tres pasos: solicitar código,
// verificarlo y definir la nueva contraseña.
export const RecuperarContrasenaPantalla = ({ navigation }) => {
  const { solicitarCodigoRecuperacion, verificarCodigoRecuperacion, restablecerContrasena } =
    useAutenticacion();

  const [paso, setPaso] = useState(PASOS.CORREO);
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [enviando, setEnviando] = useState(false);

  const solicitarCodigo = async () => {
    setEnviando(true);
    try {
      await solicitarCodigoRecuperacion(correo);
      setPaso(PASOS.CODIGO);
    } catch (error) {
      Alert.alert("No se pudo enviar el código", error.message);
    } finally {
      setEnviando(false);
    }
  };

  const confirmarCodigo = async () => {
    setEnviando(true);
    try {
      await verificarCodigoRecuperacion(codigo);
      setPaso(PASOS.NUEVA_CONTRASENA);
    } catch (error) {
      Alert.alert("Código incorrecto", error.message);
    } finally {
      setEnviando(false);
    }
  };

  const guardarNuevaContrasena = async () => {
    if (nuevaContrasena !== confirmarContrasena) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    setEnviando(true);
    try {
      await restablecerContrasena(nuevaContrasena, confirmarContrasena);
      Alert.alert("Contraseña actualizada", "Ya puedes iniciar sesión con tu nueva contraseña.");
      navigation.navigate("IniciarSesion");
    } catch (error) {
      Alert.alert("No se pudo actualizar la contraseña", error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Text style={estilos.titulo}>Recuperar contraseña</Text>

        {paso === PASOS.CORREO && (
          <View>
            <Text style={estilos.subtitulo}>
              Ingresa tu correo y te enviaremos un código de verificación.
            </Text>
            <CampoTexto
              etiqueta="Correo electrónico"
              valor={correo}
              onCambiar={setCorreo}
              tipoTeclado="email-address"
            />
            <Boton cargando={enviando} onPress={solicitarCodigo}>
              Enviar código
            </Boton>
          </View>
        )}

        {paso === PASOS.CODIGO && (
          <View>
            <Text style={estilos.subtitulo}>Ingresa el código que enviamos a tu correo.</Text>
            <CampoTexto etiqueta="Código de verificación" valor={codigo} onCambiar={setCodigo} />
            <Boton cargando={enviando} onPress={confirmarCodigo}>
              Verificar código
            </Boton>
          </View>
        )}

        {paso === PASOS.NUEVA_CONTRASENA && (
          <View>
            <Text style={estilos.subtitulo}>Escribe tu nueva contraseña.</Text>
            <CampoTexto
              etiqueta="Nueva contraseña"
              valor={nuevaContrasena}
              onCambiar={setNuevaContrasena}
              secreto
            />
            <CampoTexto
              etiqueta="Confirmar contraseña"
              valor={confirmarContrasena}
              onCambiar={setConfirmarContrasena}
              secreto
            />
            <Boton cargando={enviando} onPress={guardarNuevaContrasena}>
              Guardar nueva contraseña
            </Boton>
          </View>
        )}

        <Text style={estilos.enlaceVolver} onPress={() => navigation.goBack()}>
          ← Volver
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24 },
  titulo: { fontSize: 20, fontWeight: "700", color: colores.texto, marginBottom: 8 },
  subtitulo: { fontSize: 13, color: colores.textoClaro, marginBottom: 16 },
  enlaceVolver: { textAlign: "center", fontSize: 13, color: colores.textoClaro, marginTop: 12 },
});

export default RecuperarContrasenaPantalla;
