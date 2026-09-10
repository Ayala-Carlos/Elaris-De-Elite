import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { MenuDesplegable } from "../components/MenuDesplegable.jsx";
import { TarjetaPedido } from "../components/TarjetaPedido.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { servicioOrdenes } from "../services/servicioOrdenes.js";
import { colores } from "../theme/colores.js";

// El backend guarda orderStatus como texto libre (ver Pedidos.jsx del panel
// de administración): "pending"/"processing" mientras se prepara el pedido,
// y "completed"/"Completado" cuando ya fue entregado.
const ESTADOS_ENTREGADO = ["completed", "completado", "delivered", "entregado"];

// Adapta un pedido del backend (orders + cartId poblado) al formato que
// espera TarjetaPedido.
const adaptarPedido = (pedido) => {
  const carrito = pedido.cartId || {};
  const direccion = pedido.address?.[0];
  const cantidadProductos = (carrito.products || []).reduce(
    (suma, p) => suma + (p.quantity || 0),
    0,
  );

  return {
    id: pedido._id,
    estado: ESTADOS_ENTREGADO.includes(String(pedido.orderStatus).toLowerCase())
      ? "entregado"
      : "proceso",
    fecha: pedido.orderDate
      ? new Date(pedido.orderDate).toLocaleDateString("es-SV")
      : "",
    ubicacion: [direccion?.country, direccion?.city || direccion?.state]
      .filter(Boolean)
      .join(" "),
    cantidadProductos,
    total: Number(carrito.totalAmount ?? 0),
  };
};

// Pantalla "Mis pedidos": historial real del cliente autenticado,
// consultado en /api/orders/customer/:customerId.
export const PedidosPantalla = ({ navigation }) => {
  const { cliente } = useAutenticacion();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const cargarPedidos = useCallback(async () => {
    if (!cliente?._id) return;
    setCargando(true);
    try {
      const datos = await servicioOrdenes.obtenerPorCliente(cliente._id);
      setPedidos((datos || []).map(adaptarPedido));
    } catch (error) {
      console.log("No se pudieron cargar los pedidos:", error);
    } finally {
      setCargando(false);
    }
  }, [cliente?._id]);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => setMenuVisible(true)}
      />
      <MenuDesplegable
        visible={menuVisible}
        onCerrar={() => setMenuVisible(false)}
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={estilos.scroll}
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={cargarPedidos} tintColor={colores.primario} />
        }
      >
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")} style={estilos.botonVolver}>
          <Text style={estilos.textoVolver}>← volver a inicio</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>Mis pedidos</Text>

        {cargando && pedidos.length === 0 && (
          <ActivityIndicator color={colores.primario} style={{ marginTop: 20 }} />
        )}

        {!cargando && pedidos.length === 0 && (
          <Text style={estilos.sinPedidos}>Todavía no has realizado ningún pedido.</Text>
        )}

        {pedidos.map((pedido) => (
          <TarjetaPedido
            key={pedido.id}
            estado={pedido.estado}
            fecha={pedido.fecha}
            ubicacion={pedido.ubicacion}
            cantidadProductos={pedido.cantidadProductos}
            total={pedido.total}
            onPressDetalles={() =>
              Alert.alert("Próximamente", "El detalle del pedido estará disponible pronto.")
            }
          />
        ))}
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
  sinPedidos: { textAlign: "center", color: colores.textoClaro, marginTop: 20 },
});

export default PedidosPantalla;
