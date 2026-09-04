import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

// Tarjeta de producto usada en las listas horizontales de la pantalla de inicio.
export const TarjetaProducto = ({ producto, onPresionar }) => (
  <Pressable style={estilos.tarjeta} onPress={() => onPresionar?.(producto)}>
    <View style={estilos.contenedorImagen}>
      {producto.imagen ? (
        <Image source={{ uri: producto.imagen }} style={estilos.imagen} resizeMode="cover" />
      ) : (
        <View style={[estilos.imagen, estilos.imagenMarcador]}>
          <Ionicons name="image-outline" size={26} color={colores.textoClaro} />
        </View>
      )}
    </View>
    <Text style={estilos.nombre} numberOfLines={2}>
      {producto.nombre}
    </Text>
    <Text style={estilos.precio}>${Number(producto.precio ?? 0).toFixed(2)}</Text>
  </Pressable>
);

const estilos = StyleSheet.create({
  tarjeta: { width: 120, marginRight: 12 },
  contenedorImagen: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: colores.fondoCampo,
    overflow: "hidden",
  },
  imagen: { width: "100%", height: "100%" },
  imagenMarcador: { alignItems: "center", justifyContent: "center" },
  nombre: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: colores.texto,
  },
  precio: { marginTop: 2, fontSize: 13, fontWeight: "700", color: colores.acento },
});

export default TarjetaProducto;
