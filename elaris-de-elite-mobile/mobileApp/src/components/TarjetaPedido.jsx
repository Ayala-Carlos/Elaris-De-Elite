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
});