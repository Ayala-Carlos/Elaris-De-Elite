import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boton } from "../components/Boton.jsx";
import { servicioProductos } from "../services/servicioProductos.js";
import { colores } from "../theme/colores.js";

// Pantalla de detalle de un producto individual.
export const DetalleProductoPantalla = ({ route }) => {
  const { id } = route.params;
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    servicioProductos
      .obtenerPorId(id)
      .then((datos) => activo && setProducto(datos))
      .finally(() => activo && setCargando(false));
    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <SafeAreaView style={estilos.centro}>
        <ActivityIndicator color={colores.primario} />
      </SafeAreaView>
    );
  }

  if (!producto) {
    return (
      <SafeAreaView style={estilos.centro}>
        <Text style={estilos.textoClaro}>No se encontró el producto.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView>
        {producto.images?.[0]?.image ? (
          <Image source={{ uri: producto.images[0].image }} style={estilos.imagen} />
        ) : (
          <View style={[estilos.imagen, estilos.imagenMarcador]} />
        )}
        <View style={estilos.info}>
          <Text style={estilos.nombre}>{producto.name}</Text>
          <Text style={estilos.precio}>${Number(producto.price ?? 0).toFixed(2)}</Text>
          <Text style={estilos.descripcion}>{producto.description}</Text>
          <Boton estilo={{ marginTop: 20 }}>Agregar al carrito</Boton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  centro: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: "center",
    justifyContent: "center",
  },
  textoClaro: { color: colores.textoClaro },
  imagen: { width: "100%", height: 320, backgroundColor: colores.fondoCampo },
  imagenMarcador: {},
  info: { padding: 20 },
  nombre: { fontSize: 20, fontWeight: "700", color: colores.texto },
  precio: { fontSize: 18, fontWeight: "700", color: colores.acento, marginTop: 6 },
  descripcion: { fontSize: 14, color: colores.textoClaro, marginTop: 14, lineHeight: 20 },
});

export default DetalleProductoPantalla;
