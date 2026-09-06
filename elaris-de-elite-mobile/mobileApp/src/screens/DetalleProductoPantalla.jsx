import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MuestraColor } from "../components/MuestraColor.jsx";
import { useCarrito } from "../hooks/useCarrito.js";
import { servicioProductos } from "../services/servicioProductos.js";
import { colores } from "../theme/colores.js";

// Pantalla de detalle de un producto individual: carrusel de imágenes,
// marca, color, selector de cantidad y botón para agregar al carrito,
// tal como en el diseño de referencia.
export const DetalleProductoPantalla = ({ route, navigation }) => {
  const { id } = route.params;
  const { agregarProducto } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [agregando, setAgregando] = useState(false);

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

  const imagenes = producto.images || [];
  const hayVariasImagenes = imagenes.length > 1;
  const stockDisponible = Number(producto.stock ?? 0);
  const agotado = stockDisponible <= 0;

  const irImagenAnterior = () =>
    setIndiceImagen((actual) => (actual === 0 ? imagenes.length - 1 : actual - 1));
  const irImagenSiguiente = () =>
    setIndiceImagen((actual) => (actual === imagenes.length - 1 ? 0 : actual + 1));

  const bajarCantidad = () => setCantidad((actual) => Math.max(1, actual - 1));
  const subirCantidad = () =>
    setCantidad((actual) => (stockDisponible ? Math.min(stockDisponible, actual + 1) : actual + 1));

  const manejarAgregarAlCarrito = async () => {
    setAgregando(true);
    try {
      await agregarProducto(producto._id, cantidad);
      Alert.alert("Producto agregado", `${producto.name} se agregó al carrito.`);
    } catch (error) {
      Alert.alert("No se pudo agregar", error.message);
    } finally {
      setAgregando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView>
        <Pressable style={estilos.volver} onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={estilos.textoVolver}>‹ volver a inicio</Text>
        </Pressable>

        <View style={estilos.contenedorImagen}>
          {imagenes[indiceImagen]?.image ? (
            <Image
              source={{ uri: imagenes[indiceImagen].image }}
              style={estilos.imagen}
              resizeMode="contain"
            />
          ) : (
            <View style={[estilos.imagen, estilos.imagenMarcador]}>
              <Ionicons name="image-outline" size={40} color={colores.textoClaro} />
            </View>
          )}

          {hayVariasImagenes && (
            <>
              <Pressable style={[estilos.flecha, estilos.flechaIzquierda]} onPress={irImagenAnterior}>
                <Ionicons name="chevron-back" size={22} color={colores.texto} />
              </Pressable>
              <Pressable style={[estilos.flecha, estilos.flechaDerecha]} onPress={irImagenSiguiente}>
                <Ionicons name="chevron-forward" size={22} color={colores.texto} />
              </Pressable>
            </>
          )}
        </View>

        <View style={estilos.info}>
          {producto.idBrand?.name ? (
            <Text style={estilos.marca}>{producto.idBrand.name}</Text>
          ) : null}
          <Text style={estilos.nombre}>{producto.name}</Text>

          {producto.color ? (
            <View style={estilos.filaColor}>
              <MuestraColor color={producto.color} tamano={26} seleccionada />
              <Text style={estilos.textoColor}>{producto.color}</Text>
            </View>
          ) : null}

          <View style={estilos.filaAccion}>
            <Text style={estilos.precio}>${Number(producto.price ?? 0).toFixed(2)}</Text>

            <View style={estilos.selectorCantidad}>
              <Pressable
                style={estilos.botonCantidad}
                onPress={bajarCantidad}
                disabled={cantidad <= 1}
                hitSlop={8}
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={cantidad <= 1 ? colores.textoClaro : colores.texto}
                />
              </Pressable>
              <Text style={estilos.cantidad}>{cantidad}</Text>
              <Pressable
                style={estilos.botonCantidad}
                onPress={subirCantidad}
                disabled={agotado}
                hitSlop={8}
              >
                <Ionicons name="add" size={16} color={colores.texto} />
              </Pressable>
            </View>

            <Pressable
              style={[estilos.botonAgregar, agotado && estilos.botonAgregarDeshabilitado]}
              onPress={manejarAgregarAlCarrito}
              disabled={agotado || agregando}
            >
              {agregando ? (
                <ActivityIndicator size="small" color={colores.primario} />
              ) : (
                <Ionicons name="bag-add-outline" size={20} color={colores.primario} />
              )}
            </Pressable>
          </View>

          {agotado && <Text style={estilos.avisoAgotado}>Producto agotado</Text>}

          {producto.description ? (
            <>
              <Text style={estilos.tituloDescripcion}>Descripción</Text>
              <Text style={estilos.descripcion}>{producto.description}</Text>
            </>
          ) : null}
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
  volver: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  textoVolver: { color: colores.acento, fontSize: 13, fontWeight: "600" },
  contenedorImagen: {
    width: "100%",
    height: 300,
    backgroundColor: colores.fondoCampo,
    marginTop: 8,
  },
  imagen: { width: "100%", height: "100%" },
  imagenMarcador: { alignItems: "center", justifyContent: "center" },
  flecha: {
    position: "absolute",
    top: "50%",
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.fondoTarjeta,
    alignItems: "center",
    justifyContent: "center",
  },
  flechaIzquierda: { left: 12 },
  flechaDerecha: { right: 12 },
  info: { padding: 20 },
  marca: { fontSize: 20, fontWeight: "700", color: colores.texto },
  nombre: { fontSize: 15, color: colores.textoClaro, marginTop: 6, lineHeight: 21 },
  filaColor: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  textoColor: { marginLeft: 10, fontSize: 14, color: colores.texto, fontWeight: "600" },
  filaAccion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  precio: { fontSize: 18, fontWeight: "700", color: colores.texto },
  selectorCantidad: { flexDirection: "row", alignItems: "center" },
  botonCantidad: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colores.fondoCampo,
    alignItems: "center",
    justifyContent: "center",
  },
  cantidad: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: "700",
    color: colores.texto,
    minWidth: 16,
    textAlign: "center",
  },
  botonAgregar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colores.secundarioClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  botonAgregarDeshabilitado: { opacity: 0.5 },
  avisoAgotado: { marginTop: 10, fontSize: 12, color: colores.error, fontWeight: "600" },
  tituloDescripcion: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: "700",
    color: colores.texto,
  },
  descripcion: { fontSize: 14, color: colores.textoClaro, marginTop: 8, lineHeight: 20 },
});

export default DetalleProductoPantalla;
