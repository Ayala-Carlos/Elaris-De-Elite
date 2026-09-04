import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TarjetaProducto } from "../components/TarjetaProducto.jsx";
import { useProductos } from "../hooks/useProductos.js";
import { colores } from "../theme/colores.js";

// Pantalla con el catálogo completo de productos.
export const ProductosPantalla = ({ navigation }) => {
  const { productos, cargando } = useProductos();

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={estilos.lista}
        columnWrapperStyle={estilos.columna}
        refreshing={cargando}
        renderItem={({ item }) => (
          <TarjetaProducto
            producto={item}
            onPresionar={(producto) =>
              navigation.navigate("DetalleProducto", { id: producto.id })
            }
          />
        )}
        ListEmptyComponent={
          !cargando ? (
            <Text style={estilos.sinResultados}>No hay productos disponibles.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo, paddingTop: 12 },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colores.texto,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  lista: { paddingHorizontal: 16, paddingBottom: 24 },
  columna: { justifyContent: "space-between" },
  sinResultados: { textAlign: "center", marginTop: 40, color: colores.textoClaro },
});

export default ProductosPantalla;
