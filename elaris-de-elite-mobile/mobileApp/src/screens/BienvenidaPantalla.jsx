import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton.jsx";
import { Logo } from "../components/Logo.jsx";
import { colores } from "../theme/colores.js";

// Pantalla inicial de la app: da la bienvenida y permite ir a
// registro o inicio de sesión.
export const BienvenidaPantalla = ({ navigation }) => (
  <SafeAreaView style={estilos.contenedor}>
    <View style={estilos.centro}>
      <Text style={estilos.titulo}>Bienvenido a tu belleza</Text>
      <Logo tamano={400} estilo={estilos.logo} />
    </View>

    <View style={estilos.acciones}>
      <Boton tipo="secundario" onPress={() => navigation.navigate("Registrarse")}>
        Registrarse
      </Boton>
      <Boton
        tipo="secundario"
        estilo={estilos.espacioBoton}
        onPress={() => navigation.navigate("IniciarSesion")}
      >
        Inicia sesión
      </Boton>
    </View>
  </SafeAreaView>
);

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  centro: { flex: 1, alignItems: "center", justifyContent: "center" },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: colores.texto,
    marginBottom: 32,
    textAlign: "center",
  },
  logo: { marginTop: 8 },
  acciones: { width: "100%" },
  espacioBoton: { marginTop: 20,
    marginBottom: 90
   },
});

export default BienvenidaPantalla;
