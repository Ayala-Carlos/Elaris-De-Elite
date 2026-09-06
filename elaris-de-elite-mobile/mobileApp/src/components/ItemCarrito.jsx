import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

// Fila de un producto dentro del carrito de compras: imagen, categoría,
// nombre, selector de cantidad, subtotal y botón para quitarlo.
export const ItemCarrito = ({ item, onCambiarCantidad, onEliminar }) => {
  const producto = item.productId;
  const categoria = producto?.idCategory?.name;
  const imagen = producto?.images?.[0]?.image;

  return (
    <View style={estilos.fila}>
      <View style={estilos.contenedorImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={estilos.imagen} resizeMode="cover" />
        ) : (
          <View style={[estilos.imagen, estilos.imagenMarcador]}>
            <Ionicons name="image-outline" size={22} color={colores.textoClaro} />
          </View>
        )}
      </View>

      <View style={estilos.info}>
        {categoria ? <Text style={estilos.categoria}>{categoria}</Text> : null}
        <Text style={estilos.nombre} numberOfLines={3}>
          {producto?.name}
        </Text>

        <View style={estilos.filaInferior}>
          <View style={estilos.selectorCantidad}>
            <Pressable
              style={estilos.botonCantidad}
              onPress={() => onCambiarCantidad(item.quantity - 1)}
              hitSlop={8}
            >
              <Ionicons name="remove" size={14} color={colores.texto} />
            </Pressable>
            <Text style={estilos.cantidad}>{item.quantity}</Text>
            <Pressable
              style={estilos.botonCantidad}
              onPress={() => onCambiarCantidad(item.quantity + 1)}
              hitSlop={8}
            >
              <Ionicons name="add" size={14} color={colores.texto} />
            </Pressable>
          </View>

          <Text style={estilos.precio}>${Number(item.subtotal ?? 0).toFixed(2)}</Text>

          <Pressable onPress={onEliminar} hitSlop={8} style={estilos.botonEliminar}>
            <Ionicons name="trash-outline" size={18} color={colores.error} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  fila: {
    flexDirection: "row",
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  contenedorImagen: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: colores.fondoCampo,
    overflow: "hidden",
  },
  imagen: { width: "100%", height: "100%" },
  imagenMarcador: { alignItems: "center", justifyContent: "center" },
  info: { flex: 1, marginLeft: 12 },
  categoria: { fontSize: 13, fontWeight: "700", color: colores.acento },
  nombre: { fontSize: 12, color: colores.textoClaro, marginTop: 2, lineHeight: 16 },
  filaInferior: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  selectorCantidad: { flexDirection: "row", alignItems: "center" },
  botonCantidad: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colores.fondoCampo,
    alignItems: "center",
    justifyContent: "center",
  },
  cantidad: {
    marginHorizontal: 8,
    fontSize: 13,
    fontWeight: "700",
    color: colores.texto,
    minWidth: 12,
    textAlign: "center",
  },
  precio: { marginLeft: "auto", fontSize: 14, fontWeight: "700", color: colores.texto },
  botonEliminar: { marginLeft: 12 },
});

export default ItemCarrito;
