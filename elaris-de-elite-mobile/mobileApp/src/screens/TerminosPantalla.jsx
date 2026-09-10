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
          
          <Text style={estilos.textoLegal}>
            Al acceder a esta aplicación, aceptas cumplir con sus reglas y regulaciones.{"\n"}
            Todo el contenido y material intelectual pertenecen a Élaris de Élite o a sus licenciantes, y su uso está limitado a fines personales bajo las restricciones establecidas. Respecto a la logística, los tiempos de envío dependen de tu ubicación y se permiten devoluciones dentro de los 30 días posteriores a la recepción, siempre que los productos estén en su estado original y sin usar.
          </Text>

          <TouchableOpacity onPress={() => console.log("Navegar a web de términos")}>
            <Text style={estilos.enlaceSaberMas}>
              Saber mas acerca de nuestros terminos y condiciones
            </Text>
          </TouchableOpacity>

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
  
  textoLegal: {
    fontSize: 13,
    color: colores.texto,
    textAlign: "center",
    lineHeight: 20, 
    marginBottom: 30, 
  },
  
  enlaceSaberMas: {
    fontSize: 11,
    color: colores.textoClaro,
    textAlign: "center",
  },
});

export default TerminosPantalla;