import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { colores } from "../theme/colores.js";

export const PedidosPantalla = ({ navigation }) => {
  return (
    // SafeAreaView protege el contenido del notch y bordes del teléfono
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => {
          console.log("Abrir menú");
        }}
      />

      <ScrollView contentContainerStyle={estilos.scroll}>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate("Inicio")} 
          style={estilos.botonVolver}
        >
          <Text style={estilos.textoVolver}>← volver a inicio</Text>
        </TouchableOpacity>

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
    color: colores.secundario, 
    fontWeight: "600",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: colores.texto, 
    marginBottom: 20,
  },
});

export default PedidosPantalla;