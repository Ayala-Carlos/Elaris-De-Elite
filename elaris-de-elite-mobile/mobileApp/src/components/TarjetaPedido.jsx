import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

export const TarjetaPedido = ({
  estado, // 'proceso' | 'entregado'
  fecha,
  ubicacion,
  cantidadProductos,
  total,
  onPressDetalles,
}) => {
  const esEntregado = estado === "entregado";
  const colorEstado = esEntregado ? colores.exito : colores.primario;
  const textoEstado = esEntregado
    ? `Entregado - ${fecha}`
    : "En proceso - En aduana";

  return (
    <View style={estilos.tarjeta}>
      {/* Icono izquierdo */}
      <View style={estilos.iconoContenedor}>
        <Ionicons name="basket" size={54} color="#7A7A7A" />
      </View>

      {/* Información derecha */}
      <View style={estilos.infoContenedor}>
        <View style={estilos.filaTitulo}>
          <Text style={[estilos.textoEstado, { color: colorEstado }]}>
            {textoEstado}
          </Text>
        </View>

        <Text style={estilos.textoUbicacion}>{ubicacion}</Text>

        <View style={estilos.filaMedio}>
          <Text style={estilos.textoProductos}>{cantidadProductos} productos</Text>
          <Text style={estilos.textoPrecio}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={estilos.botonDetalles} onPress={onPressDetalles}>
          <Ionicons name="eye-outline" size={14} color={colores.texto} />
          <Text style={estilos.textoBotonDetalles}>Ver detalles del pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
    tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    // Sombra para iOS y Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconoContenedor: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContenedor: {
    flex: 1,
  },
  filaTitulo: {
    marginBottom: 4,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: "700",
  },
  textoUbicacion: {
    fontSize: 12,
    color: colores.textoClaro,
    marginBottom: 12,
  },
  filaMedio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  textoProductos: {
    fontSize: 12,
    color: colores.textoClaro,
  },
  textoPrecio: {
    fontSize: 14,
    fontWeight: "600",
    color: colores.texto,
  },
  botonDetalles: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoBotonDetalles: {
    fontSize: 11,
    fontWeight: "700",
    color: colores.texto,
    marginLeft: 4,
  },
});