import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";
import { capitalizar } from "../utils/formatoTexto.js";

// Pantalla de detalle de un pedido: se abre al presionar "Ver detalles del
// pedido" en una TarjetaPedido (ver PedidosPantalla.jsx), que ya envía el
// pedido adaptado por navegación para no tener que volver a consultarlo.
export const DetallePedidoPantalla = ({ route, navigation }) => {
  const { pedido } = route.params;
  const esEntregado = pedido.estado === "entregado";
  const colorEstado = esEntregado ? colores.exito : colores.primario;
  const textoEstado = esEntregado ? "Entregado" : "En proceso";

  const direccionCompleta = [
    pedido.direccion?.detailedAddress,
    pedido.direccion?.city,
    pedido.direccion?.state,
    pedido.direccion?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Pressable style={estilos.botonVolver} onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={estilos.textoVolver}>‹ volver a mis pedidos</Text>
        </Pressable>

        <View style={estilos.encabezado}>
          <View>
            <Text style={estilos.titulo}>Pedido #{String(pedido.id).slice(-6).toUpperCase()}</Text>
            <Text style={estilos.fecha}>{pedido.fecha}</Text>
          </View>
          <View style={[estilos.insignia, { backgroundColor: `${colorEstado}22` }]}>
            <Text style={[estilos.textoInsignia, { color: colorEstado }]}>{textoEstado}</Text>
          </View>
        </View>

        {direccionCompleta ? (
          <View style={estilos.tarjeta}>
            <View style={estilos.tituloSeccionFila}>
              <Ionicons name="location-outline" size={16} color={colores.texto} />
              <Text style={estilos.tituloSeccion}>Dirección de envío</Text>
            </View>
            <Text style={estilos.textoDireccion}>{direccionCompleta}</Text>
          </View>
        ) : null}

        <View style={estilos.tarjeta}>
          <View style={estilos.tituloSeccionFila}>
            <Ionicons name="bag-handle-outline" size={16} color={colores.texto} />
            <Text style={estilos.tituloSeccion}>
              Productos ({pedido.cantidadProductos})
            </Text>
          </View>

          {(pedido.productos || []).map((producto, indice) => (
            <View
              key={`${producto.id}-${indice}`}
              style={[
                estilos.filaProducto,
                indice === pedido.productos.length - 1 && { marginBottom: 0, borderBottomWidth: 0 },
              ]}
            >
              <View style={estilos.contenedorImagen}>
                {producto.imagen ? (
                  <Image source={{ uri: producto.imagen }} style={estilos.imagen} resizeMode="cover" />
                ) : (
                  <View style={[estilos.imagen, estilos.imagenMarcador]}>
                    <Ionicons name="image-outline" size={18} color={colores.textoClaro} />
                  </View>
                )}
              </View>

              <View style={estilos.infoProducto}>
                <Text style={estilos.nombreProducto} numberOfLines={2}>
                  {producto.nombre}
                </Text>
                <Text style={estilos.cantidadProducto}>Cantidad: {producto.cantidad}</Text>
              </View>

              <Text style={estilos.subtotalProducto}>${producto.subtotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={estilos.tarjeta}>
          <View style={estilos.tituloSeccionFila}>
            <Ionicons name="receipt-outline" size={16} color={colores.texto} />
            <Text style={estilos.tituloSeccion}>Resumen de pago</Text>
          </View>

          <View style={estilos.filaResumen}>
            <Text style={estilos.etiquetaResumen}>Subtotal</Text>
            <Text style={estilos.valorResumen}>${pedido.subtotal.toFixed(2)}</Text>
          </View>

          {pedido.descuento > 0 && (
            <View style={estilos.filaResumen}>
              <Text style={estilos.etiquetaResumen}>Descuento</Text>
              <Text style={estilos.valorResumen}>-${pedido.descuento.toFixed(2)}</Text>
            </View>
          )}

          <View style={estilos.separador} />

          <View style={estilos.filaResumen}>
            <Text style={estilos.etiquetaTotal}>Total</Text>
            <Text style={estilos.valorTotal}>${pedido.total.toFixed(2)}</Text>
          </View>

          {pedido.metodoPago ? (
            <View style={estilos.filaMetodoPago}>
              <Ionicons name="card-outline" size={16} color={colores.textoClaro} />
              <Text style={estilos.textoMetodoPago}>
                {capitalizar(pedido.metodoPago)}
                {pedido.estadoPago ? ` · ${capitalizar(pedido.estadoPago)}` : ""}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, paddingTop: 16, paddingBottom: 40 },
  botonVolver: { marginBottom: 16 },
  textoVolver: { fontSize: 12, color: colores.secundario, fontWeight: "600" },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  titulo: { fontSize: 20, fontWeight: "800", color: colores.texto },
  fecha: { fontSize: 12, color: colores.textoClaro, marginTop: 4 },
  insignia: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  textoInsignia: { fontSize: 12, fontWeight: "700" },
  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tituloSeccionFila: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  tituloSeccion: { marginLeft: 8, fontSize: 14, fontWeight: "700", color: colores.texto },
  textoDireccion: { fontSize: 13, color: colores.textoClaro, lineHeight: 19 },
  filaProducto: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  contenedorImagen: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colores.fondoCampo,
    overflow: "hidden",
  },
  imagen: { width: "100%", height: "100%" },
  imagenMarcador: { alignItems: "center", justifyContent: "center" },
  infoProducto: { flex: 1, marginLeft: 12 },
  nombreProducto: { fontSize: 13, fontWeight: "600", color: colores.texto },
  cantidadProducto: { fontSize: 12, color: colores.textoClaro, marginTop: 2 },
  subtotalProducto: { fontSize: 13, fontWeight: "700", color: colores.texto, marginLeft: 8 },
  filaResumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  etiquetaResumen: { fontSize: 13, color: colores.textoClaro },
  valorResumen: { fontSize: 13, fontWeight: "600", color: colores.texto },
  separador: { height: 1, backgroundColor: colores.borde, marginVertical: 10 },
  etiquetaTotal: { fontSize: 15, fontWeight: "700", color: colores.texto },
  valorTotal: { fontSize: 15, fontWeight: "700", color: colores.acento },
  filaMetodoPago: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  textoMetodoPago: { marginLeft: 8, fontSize: 12, color: colores.textoClaro },
});

export default DetallePedidoPantalla;
