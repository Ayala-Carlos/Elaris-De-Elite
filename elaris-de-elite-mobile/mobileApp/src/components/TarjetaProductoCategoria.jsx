import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";
import { MuestraColor } from "./MuestraColor.jsx";

// Tarjeta de producto usada en la cuadrícula de una categoría: incluye
// la marca/descripción, el color y un botón rápido para agregar al carrito,
// tal como se ve en la pantalla de categoría del diseño de referencia.
export const TarjetaProductoCategoria = ({ producto, onPresionar, onAgregar }) => {
  const marca = producto.original?.idBrand?.name;
  const color = producto.original?.color;

  return (
    <Pressable style={estilos.tarjeta} onPress={() => onPresionar?.(producto)}>
      <View style={estilos.contenedorImagen}>
        {producto.imagen ? (
          <Image source={{ uri: producto.imagen }} style={estilos.imagen} resizeMode="cover" />
        ) : (
          <View style={[estilos.imagen, estilos.imagenMarcador]}>
            <Ionicons name="image-outline" size={28} color={colores.textoClaro} />
          </View>
        )}
      </View>

      {marca ? <Text style={estilos.marca}>{marca}</Text> : null}
      <Text style={estilos.nombre} numberOfLines={2}>
        {producto.nombre}
      </Text>

      {color ? (
        <View style={estilos.filaColor}>
          <MuestraColor color={color} tamano={14} />
          <Text style={estilos.textoColor}>{color}</Text>
        </View>
      ) : null}

      <View style={estilos.filaInferior}>
        <Text style={estilos.precio}>${Number(producto.precio ?? 0).toFixed(2)}</Text>
        <Pressable
          hitSlop={8}
          style={estilos.botonAgregar}
          onPress={() => onAgregar?.(producto)}
        >
          <Ionicons name="bag-add-outline" size={16} color={colores.primario} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const estilos = StyleSheet.create({
  tarjeta: {
    width: "48%",
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
  },
  contenedorImagen: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    backgroundColor: colores.fondoCampo,
    overflow: "hidden",
  },
  imagen: { width: "100%", height: "100%" },
  imagenMarcador: { alignItems: "center", justifyContent: "center" },
  marca: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: colores.texto,
  },
  nombre: {
    marginTop: 2,
    fontSize: 12,
    color: colores.textoClaro,
    lineHeight: 16,
  },
  filaColor: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  textoColor: { marginLeft: 6, fontSize: 11, color: colores.textoClaro },
  filaInferior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  precio: { fontSize: 14, fontWeight: "700", color: colores.acento },
  botonAgregar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colores.secundarioClaro,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TarjetaProductoCategoria;
