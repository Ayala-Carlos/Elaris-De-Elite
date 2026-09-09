import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { colores } from "../theme/colores.js";

export const PedidosPantalla = ({ navigation }) => {
  return (
    // SafeAreaView protege el contenido del notch y bordes del teléfono
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>

      <ScrollView contentContainerStyle={estilos.scroll}>

        <Text style={estilos.titulo}>Mis pedidos</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  scroll: {
    padding: 24,
    paddingTop: 16,
  },
  botonVolver: {
    marginBottom: 16,
  },
  textoVolver: {
    fontSize: 12,
    color: colores.secundario, // El rosa de tu paleta
    fontWeight: "600",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: colores.texto, // El café oscuro de tu paleta
    marginBottom: 20,
  },
});

export default PedidosPantalla;