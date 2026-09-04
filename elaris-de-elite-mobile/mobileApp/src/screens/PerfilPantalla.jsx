import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Boton } from "../components/Boton.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";

// Pantalla de perfil del cliente autenticado.
export const PerfilPantalla = () => {
  const { cliente, cerrarSesion } = useAutenticacion();

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion();
    } catch (error) {
      Alert.alert("No se pudo cerrar sesión", error.message);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.avatar}>
        <Ionicons name="person-outline" size={36} color={colores.blanco} />
      </View>
      <Text style={estilos.nombre}>{cliente?.name || "Cliente Élaris"}</Text>
      <Text style={estilos.correo}>{cliente?.email}</Text>

      <Boton tipo="contorno" estilo={estilos.boton} onPress={manejarCerrarSesion}>
        Cerrar sesión
      </Boton>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colores.primario,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  nombre: { fontSize: 18, fontWeight: "700", color: colores.texto },
  correo: { fontSize: 13, color: colores.textoClaro, marginTop: 4, marginBottom: 32 },
  boton: { width: "100%" },
});

export default PerfilPantalla;
