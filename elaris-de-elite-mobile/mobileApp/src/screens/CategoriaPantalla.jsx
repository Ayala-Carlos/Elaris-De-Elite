import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { TarjetaProductoCategoria } from "../components/TarjetaProductoCategoria.jsx";
import { useCarrito } from "../hooks/useCarrito.js";
import { useProductos } from "../hooks/useProductos.js";
import { colores } from "../theme/colores.js";
import { capitalizar } from "../utils/formatoTexto.js";

// Pantalla con la cuadrícula de productos de una sola categoría
// (ej. "Rubores"), a la que se llega desde "Ver más" en el inicio.
export const CategoriaPantalla = ({ route, navigation }) => {
  const { categoria } = route.params;
  const { productos, cargando } = useProductos();
  const { agregarProducto } = useCarrito();
  const [buscar, setBuscar] = useState("");

  const productosDeCategoria = useMemo(() => {
    const deLaCategoria = productos.filter((p) => p.categoria === categoria);
    if (!buscar.trim()) return deLaCategoria;
    return deLaCategoria.filter((p) =>
      p.nombre?.toLowerCase().includes(buscar.trim().toLowerCase()),
    );
  }, [productos, categoria, buscar]);

  const manejarAgregar = async (producto) => {
    try {
      await agregarProducto(producto.id, 1);
      Alert.alert("Producto agregado", `${producto.nombre} se agregó al carrito.`);
    } catch (error) {
      Alert.alert("No se pudo agregar", error.message);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <EncabezadoInicio
        buscar={buscar}
        onCambiarBuscar={setBuscar}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => navigation.navigate("Perfil")}
      />

      <FlatList
        data={productosDeCategoria}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={estilos.lista}
        columnWrapperStyle={estilos.columna}
        ListHeaderComponent={
          <Text style={estilos.pildoraTitulo}>{capitalizar(categoria)}</Text>
        }
        refreshing={cargando}
        renderItem={({ item }) => (
          <TarjetaProductoCategoria
            producto={item}
            onPresionar={(producto) =>
              navigation.navigate("DetalleProducto", { id: producto.id })
            }
            onAgregar={manejarAgregar}
          />
        )}
        ListEmptyComponent={
          !cargando ? (
            <Text style={estilos.sinResultados}>
              No hay productos en esta categoría.
            </Text>
          ) : null
        }
      />

      {cargando && (
        <ActivityIndicator style={{ marginTop: 12 }} color={colores.primario} />
      )}
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  pildoraTitulo: {
    backgroundColor: colores.secundarioClaro,
    color: colores.acento,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  lista: { paddingHorizontal: 16, paddingBottom: 24 },
  columna: { justifyContent: "space-between" },
  sinResultados: {
    textAlign: "center",
    marginTop: 24,
    marginHorizontal: 16,
    color: colores.textoClaro,
  },
});

export default CategoriaPantalla;
