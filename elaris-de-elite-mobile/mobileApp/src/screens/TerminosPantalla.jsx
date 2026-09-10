import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { colores } from "../theme/colores.js";

export const TerminosPantalla = ({ navigation }) => {
  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => console.log("Abrir menú")}
      />

      <ScrollView contentContainerStyle={estilos.scroll}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Inicio")} 
          style={estilos.botonVolver}
        >
          <Text style={estilos.textoVolver}>← volver a inicio</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>Términos y condiciones</Text>

        <View style={estilos.tarjetaFondo}>
          
    

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, paddingTop: 16 },
  botonVolver: { marginBottom: 16 },
  textoVolver: { fontSize: 12, color: colores.secundario, fontWeight: "600" },
  titulo: { fontSize: 22, fontWeight: "800", color: colores.texto, marginBottom: 20 },
  
  tarjetaFondo: {
    backgroundColor: colores.secundarioClaro, // Fondo rosa clarito
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
});

export default TerminosPantalla;