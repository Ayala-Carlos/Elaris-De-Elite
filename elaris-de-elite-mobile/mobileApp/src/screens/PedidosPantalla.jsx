import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

// Pantalla de historial de pedidos (pendiente de conectar con /api/orders).
export const PedidosPantalla = () => (
  <SafeAreaView style={estilos.contenedor}>
    <Ionicons name="receipt-outline" size={48} color={colores.textoClaro} />
    <Text style={estilos.titulo}>Aún no tienes pedidos</Text>
    <Text style={estilos.subtitulo}>Cuando realices una compra, la verás aquí.</Text>
  </SafeAreaView>
);

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: { fontSize: 16, fontWeight: "700", color: colores.texto, marginTop: 12 },
  subtitulo: { fontSize: 13, color: colores.textoClaro, marginTop: 4, textAlign: "center" },
});

export default PedidosPantalla;
