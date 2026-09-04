import { FlatList, StyleSheet, Text, View } from "react-native";
import { colores } from "../theme/colores.js";
import { TarjetaProducto } from "./TarjetaProducto.jsx";

// Sección con título de categoría ("Rubores", "Bases", ...) y una lista
// horizontal de productos, tal como se ve en la pantalla de inicio.
export const SeccionProductos = ({ titulo, productos, onPresionarProducto, onVerMas }) => {
  if (!productos?.length) return null;

  return (
    <View style={estilos.seccion}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>{titulo}</Text>
        {onVerMas ? (
          <Text style={estilos.verMas} onPress={onVerMas}>
            Ver más
          </Text>
        ) : null}
      </View>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaProducto producto={item} onPresionar={onPresionarProducto} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.lista}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  seccion: { marginTop: 20 },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  titulo: { fontSize: 15, fontWeight: "700", color: colores.texto },
  verMas: { fontSize: 12, color: colores.primario, fontWeight: "600" },
  lista: { paddingHorizontal: 16 },
});

export default SeccionProductos;
