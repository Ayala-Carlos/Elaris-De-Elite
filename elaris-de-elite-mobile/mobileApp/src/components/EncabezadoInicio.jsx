import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

const imagenLogo = require("../../assets/logoElarisElite.png");

// Encabezado superior reutilizado en varias pantallas: logo, carrito y menú,
// con un buscador opcional (mostrarBuscador=false lo oculta, como en el
// detalle de producto, el carrito y el perfil), replicando el diseño web.
export const EncabezadoInicio = ({
  buscar,
  onCambiarBuscar,
  onPresionarCarrito,
  onPresionarMenu,
  mostrarBuscador = true,
}) => (
  <View style={estilos.contenedor}>
    <View style={[estilos.filaSuperior, !mostrarBuscador && estilos.filaSuperiorSinBuscador]}>
      <View style={estilos.marca}>
        <Image source={imagenLogo} resizeMode="contain" style={estilos.logo} />
        <Text style={estilos.nombreMarca}>ÉLARIS DE ÉLITE</Text>
      </View>
      <View style={estilos.iconos}>
        <Ionicons
          name="cart-outline"
          size={22}
          color={colores.texto}
          onPress={onPresionarCarrito}
        />
        <Ionicons
          name="menu-outline"
          size={24}
          color={colores.texto}
          onPress={onPresionarMenu}
          style={{ marginLeft: 16 }}
        />
      </View>
    </View>
    {mostrarBuscador && (
      <View style={estilos.buscador}>
        <Ionicons name="search-outline" size={18} color={colores.textoClaro} />
        <TextInput
          value={buscar}
          onChangeText={onCambiarBuscar}
          placeholder="Buscar"
          placeholderTextColor={colores.textoClaro}
          style={estilos.entradaBusqueda}
        />
      </View>
    )}
  </View>
);

const estilos = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colores.fondoTarjeta,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  filaSuperior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filaSuperiorSinBuscador: { marginBottom: 0 },
  marca: { flexDirection: "row", alignItems: "center", flexShrink: 1 },
  logo: { width: 28, height: 28, marginRight: 6 },
  nombreMarca: {
    fontSize: 13,
    fontWeight: "700",
    color: colores.acento,
    letterSpacing: 0.5,
  },
  iconos: { flexDirection: "row", alignItems: "center" },
  buscador: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.fondoCampo,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  entradaBusqueda: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: colores.texto,
  },
});

export default EncabezadoInicio;
