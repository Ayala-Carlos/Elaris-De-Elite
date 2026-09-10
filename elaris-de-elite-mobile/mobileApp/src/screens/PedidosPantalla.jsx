import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { TarjetaPedido } from "../components/TarjetaPedido.jsx"; // <-- Importamos el nuevo componente
import { colores } from "../theme/colores.js";

// Datos de prueba basados en tu diseño
const PEDIDOS_PRUEBA = [
  {
    id: "1",
    estado: "proceso",
    ubicacion: "El Salvador San Salvador",
    cantidadProductos: 4,
    total: 300.00,
  },
  {
    id: "2",
    estado: "entregado",
    fecha: "23/02/2026",
    ubicacion: "El Salvador San Salvador",
    cantidadProductos: 2,
    total: 102.00,
  },
];

export const PedidosPantalla = ({ navigation }) => {
  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => console.log("Abrir menú")}
      />

      <ScrollView contentContainerStyle={estilos.scroll}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Inicio")} 
          style={estilos.botonVolver}
        >
          <Text style={estilos.textoVolver}>← volver a inicio</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>Mis pedidos</Text>

        {/* Mapeamos los pedidos de prueba */}
        {PEDIDOS_PRUEBA.map((pedido) => (
          <TarjetaPedido
            key={pedido.id}
            estado={pedido.estado}
            fecha={pedido.fecha}
            ubicacion={pedido.ubicacion}
            cantidadProductos={pedido.cantidadProductos}
            total={pedido.total}
            onPressDetalles={() => console.log("Ver detalles del pedido", pedido.id)}
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
});

export default PedidosPantalla;