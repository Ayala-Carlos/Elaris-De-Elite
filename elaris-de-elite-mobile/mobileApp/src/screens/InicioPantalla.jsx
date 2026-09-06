import { useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { SeccionProductos } from "../components/SeccionProductos.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { useProductos } from "../hooks/useProductos.js";
import { colores } from "../theme/colores.js";
import { capitalizar } from "../utils/formatoTexto.js";

// Pantalla principal: saludo, banner de colección destacada y productos
// agrupados por categoría, tal como en el diseño de referencia.
export const InicioPantalla = ({ navigation }) => {
  const { cliente } = useAutenticacion();
  const { productos, categorias, cargando } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  const primerNombre = (cliente?.name || "").split(" ")[0] || "";

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos;
    return productos.filter((p) =>
      p.nombre?.toLowerCase().includes(busqueda.trim().toLowerCase()),
    );
  }, [productos, busqueda]);

  const categoriasParaMostrar = categorias.filter((c) => c !== "TODOS");

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <EncabezadoInicio
        buscar={busqueda}
        onCambiarBuscar={setBusqueda}
        onPresionarCarrito={() => navigation.navigate("Carrito")}
        onPresionarMenu={() => navigation.navigate("Perfil")}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={estilos.saludo}>Bienveni@ {primerNombre || "de nuevo"}</Text>

        <View style={estilos.banner}>
          <Image
            source={require("../../assets/logoElarisElite.png")}
            resizeMode="cover"
            style={estilos.imagenBanner}
          />
          <View style={estilos.overlayBanner}>
            <Text style={estilos.textoBanner}>Nueva colección</Text>
          </View>
        </View>

        <View style={estilos.pildoraDestacados}>
          <Text style={estilos.textoDestacados}>Productos destacados</Text>
        </View>

        {cargando && (
          <ActivityIndicator style={{ marginTop: 24 }} color={colores.primario} />
        )}

        {!cargando &&
          categoriasParaMostrar.map((categoria) => (
            <SeccionProductos
              key={categoria}
              titulo={capitalizar(categoria)}
              productos={productosFiltrados.filter((p) => p.categoria === categoria)}
              onPresionarProducto={(producto) =>
                navigation.navigate("DetalleProducto", { id: producto.id })
              }
              onVerMas={() => navigation.navigate("Categoria", { categoria })}
            />
          ))}

        {!cargando && productosFiltrados.length === 0 && (
          <Text style={estilos.sinResultados}>No se encontraron productos.</Text>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  saludo: {
    fontSize: 16,
    fontWeight: "700",
    color: colores.texto,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  banner: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    height: 150,
    backgroundColor: colores.fondoCampo,
  },
  imagenBanner: { width: "100%", height: "100%" },
  overlayBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(31,27,24,0.45)",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textoBanner: { color: colores.blanco, fontWeight: "700", fontSize: 14 },
  pildoraDestacados: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: colores.secundario,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  textoDestacados: { color: colores.blanco, fontWeight: "700", fontSize: 13 },
  sinResultados: {
    textAlign: "center",
    marginTop: 24,
    color: colores.textoClaro,
  },
});

export default InicioPantalla;
