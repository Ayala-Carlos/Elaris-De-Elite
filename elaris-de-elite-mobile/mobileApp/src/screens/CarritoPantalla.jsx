import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Boton } from "../components/Boton.jsx";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { ItemCarrito } from "../components/ItemCarrito.jsx";
import { MenuDesplegable } from "../components/MenuDesplegable.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { useCarrito } from "../hooks/useCarrito.js";
import { colores } from "../theme/colores.js";

// Envío gratis a partir de este monto y tasa de IVA usadas solo para
// mostrar el resumen del pedido (el backend no calcula estos valores).
const ENVIO_GRATIS_DESDE = 100;
const COSTO_ENVIO = 5;
const TASA_IVA = 0.16;

// Pantalla de carrito de compras: resumen de productos, código de
// descuento, resumen de pedido y botón para proceder con el pago.
export const CarritoPantalla = ({ navigation }) => {
  const { cliente } = useAutenticacion();
  const {
    productos,
    subtotal,
    montoDescuento,
    cargando,
    actualizarCantidad,
    eliminarProducto,
    aplicarCodigoDescuento,
    pagarPedido,
  } = useCarrito();

  const [menuVisible, setMenuVisible] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [aplicandoCodigo, setAplicandoCodigo] = useState(false);
  const [pagando, setPagando] = useState(false);

  const baseConDescuento = Math.max(subtotal - montoDescuento, 0);
  const envio = baseConDescuento >= ENVIO_GRATIS_DESDE || baseConDescuento === 0 ? 0 : COSTO_ENVIO;
  const iva = baseConDescuento * TASA_IVA;
  const total = baseConDescuento + envio + iva;

  const manejarAplicarCodigo = async () => {
    if (!codigo.trim()) return;
    setAplicandoCodigo(true);
    try {
      await aplicarCodigoDescuento(codigo.trim());
      Alert.alert("Código aplicado", "El descuento se aplicó a tu carrito.");
    } catch (error) {
      Alert.alert("Código inválido", error.message);
    } finally {
      setAplicandoCodigo(false);
    }
  };

  const manejarPagar = async () => {
    if (!cliente?.country || !cliente?.address) {
      Alert.alert(
        "Completa tu dirección",
        "Agrega tu país y dirección en tu perfil antes de continuar con el pago.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Ir a mi perfil", onPress: () => navigation.navigate("Perfil") },
        ],
      );
      return;
    }

    setPagando(true);
    try {
      await pagarPedido({ country: cliente.country, detailedAddress: cliente.address });
      Alert.alert("Pedido realizado", "Tu pedido se procesó correctamente.", [
        { text: "Ver mis pedidos", onPress: () => navigation.navigate("Pedidos") },
      ]);
    } catch (error) {
      Alert.alert("No se pudo procesar el pago", error.message);
    } finally {
      setPagando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() => {}}
        onPresionarMenu={() => setMenuVisible(true)}
      />
      <MenuDesplegable
        visible={menuVisible}
        onCerrar={() => setMenuVisible(false)}
        navigation={navigation}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.productId?._id || item.productId}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={
          <>
            <Pressable
              style={estilos.volver}
              onPress={() => navigation.navigate("Inicio")}
              hitSlop={8}
            >
              <Text style={estilos.textoVolver}>‹ volver a inicio</Text>
            </Pressable>
            <Text style={estilos.titulo}>Carrito de compras</Text>

            {cargando && productos.length === 0 && (
              <ActivityIndicator color={colores.primario} style={{ marginTop: 20 }} />
            )}

            {!cargando && productos.length > 0 && (
              <Text style={estilos.subtitulo}>Resumen de compra</Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <ItemCarrito
            item={item}
            onCambiarCantidad={(cantidad) =>
              actualizarCantidad(item.productId?._id || item.productId, cantidad)
            }
            onEliminar={() => eliminarProducto(item.productId?._id || item.productId)}
          />
        )}
        ListEmptyComponent={
          !cargando ? (
            <View style={estilos.vacio}>
              <Ionicons name="cart-outline" size={48} color={colores.textoClaro} />
              <Text style={estilos.tituloVacio}>Tu carrito está vacío</Text>
              <Text style={estilos.subtituloVacio}>
                Los productos que agregues aparecerán aquí.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          productos.length > 0 ? (
            <View style={estilos.resumen}>
              <Text style={estilos.tituloResumen}>Resumen de pedido</Text>

              <View style={estilos.filaResumen}>
                <Text style={estilos.etiquetaResumen}>Subtotal</Text>
                <Text style={estilos.valorResumen}>${subtotal.toFixed(2)}</Text>
              </View>

              {montoDescuento > 0 && (
                <View style={estilos.filaResumen}>
                  <Text style={estilos.etiquetaResumen}>Descuento</Text>
                  <Text style={estilos.valorResumen}>-${montoDescuento.toFixed(2)}</Text>
                </View>
              )}

              <View style={estilos.filaResumen}>
                <Text style={estilos.etiquetaResumen}>Envío</Text>
                <Text style={estilos.valorResumen}>
                  {envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}
                </Text>
              </View>

              <View style={estilos.filaResumen}>
                <Text style={estilos.etiquetaResumen}>IVA (16%)</Text>
                <Text style={estilos.valorResumen}>${iva.toFixed(2)}</Text>
              </View>

              <View style={estilos.separador} />

              <View style={estilos.filaResumen}>
                <Text style={estilos.etiquetaTotal}>Total</Text>
                <Text style={estilos.valorTotal}>${total.toFixed(2)}</Text>
              </View>

              <Text style={estilos.etiquetaCodigo}>Código de descuento</Text>
              <View style={estilos.filaCodigo}>
                <TextInput
                  value={codigo}
                  onChangeText={setCodigo}
                  placeholder="Ingresa el código"
                  placeholderTextColor={colores.textoClaro}
                  autoCapitalize="characters"
                  style={estilos.campoCodigo}
                />
                <Boton
                  tipo="contorno"
                  anchoCompleto={false}
                  estilo={estilos.botonCodigo}
                  cargando={aplicandoCodigo}
                  onPress={manejarAplicarCodigo}
                >
                  Aplicar
                </Boton>
              </View>

              <Boton
                estilo={{ marginTop: 20 }}
                cargando={pagando}
                onPress={manejarPagar}
              >
                Proceder con pago
              </Boton>
              <Boton
                tipo="secundario"
                estilo={{ marginTop: 10 }}
                onPress={() => navigation.navigate("Productos")}
              >
                Continuar comprando
              </Boton>

              <View style={estilos.beneficios}>
                {[
                  "Envío gratuito en pedidos superiores a $100",
                  "Devoluciones fáciles en 30 días",
                  "Compra 100% segura y protegida",
                ].map((beneficio) => (
                  <View key={beneficio} style={estilos.filaBeneficio}>
                    <Ionicons name="checkmark-circle" size={18} color={colores.secundario} />
                    <Text style={estilos.textoBeneficio}>{beneficio}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  lista: { paddingHorizontal: 16, paddingBottom: 32 },
  volver: { paddingTop: 14, paddingBottom: 4 },
  textoVolver: { color: colores.acento, fontSize: 13, fontWeight: "600" },
  titulo: { fontSize: 20, fontWeight: "700", color: colores.texto, marginTop: 6 },
  subtitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: colores.texto,
    marginTop: 18,
    marginBottom: 12,
  },
  vacio: { alignItems: "center", paddingVertical: 60 },
  tituloVacio: { fontSize: 16, fontWeight: "700", color: colores.texto, marginTop: 12 },
  subtituloVacio: {
    fontSize: 13,
    color: colores.textoClaro,
    marginTop: 4,
    textAlign: "center",
  },
  resumen: {
    marginTop: 24,
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 16,
    padding: 16,
  },
  tituloResumen: { fontSize: 15, fontWeight: "700", color: colores.texto, marginBottom: 12 },
  filaResumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  etiquetaResumen: { fontSize: 13, color: colores.textoClaro },
  valorResumen: { fontSize: 13, fontWeight: "600", color: colores.texto },
  separador: { height: 1, backgroundColor: colores.borde, marginVertical: 10 },
  etiquetaTotal: { fontSize: 15, fontWeight: "700", color: colores.texto },
  valorTotal: { fontSize: 15, fontWeight: "700", color: colores.acento },
  etiquetaCodigo: { fontSize: 13, fontWeight: "700", color: colores.texto, marginTop: 20 },
  filaCodigo: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  campoCodigo: {
    flex: 1,
    backgroundColor: colores.fondoCampo,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: colores.texto,
    marginRight: 10,
  },
  botonCodigo: { paddingHorizontal: 18, paddingVertical: 10 },
  beneficios: { marginTop: 22 },
  filaBeneficio: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  textoBeneficio: { marginLeft: 8, fontSize: 12, color: colores.textoClaro, flexShrink: 1 },
});

export default CarritoPantalla;
