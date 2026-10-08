import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { MenuDesplegable } from "../components/MenuDesplegable.jsx";
import { MuestraColor } from "../components/MuestraColor.jsx";
import { useCarrito } from "../hooks/useCarrito.js";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { servicioProductos } from "../services/servicioProductos.js";
import { servicioResenas } from "../services/servicioResenas.js";
import { colores } from "../theme/colores.js";

export const DetalleProductoPantalla = ({ route, navigation }) => {
  const { id } = route.params;

  // Carrito y Autenticación desde los Hooks
  const { agregarProducto, carrito: datosCarrito } = useCarrito();
  const carrito = Array.isArray(datosCarrito) ? datosCarrito : [];
  const { cliente } = useAutenticacion();

  // Estados del Producto
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [agregando, setAgregando] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Estados de Reseñas
  const [resenas, setResenas] = useState([]);
  const [cargandoResenas, setCargandoResenas] = useState(true);
  const [miCalificacion, setMiCalificacion] = useState(5);
  const [miComentario, setMiComentario] = useState("");
  const [enviandoResena, setEnviandoResena] = useState(false);

  // Cargar datos del producto y reseñas
  useEffect(() => {
    let activo = true;

    servicioProductos
      .obtenerPorId(id)
      .then((datos) => activo && setProducto(datos))
      .finally(() => activo && setCargando(false));

    cargarResenas();

    return () => {
      activo = false;
    };
  }, [id]);

  const cargarResenas = async () => {
    setCargandoResenas(true);
    try {
      if (servicioResenas?.obtenerPorProducto) {
        const respuesta = await servicioResenas.obtenerPorProducto(id);
        const lista = Array.isArray(respuesta)
          ? respuesta
          : respuesta?.reviews || respuesta?.data || [];
        setResenas(lista);
      } else {
        setResenas([]);
      }
    } catch (error) {
      console.log("Error al cargar reseñas:", error.message);
      setResenas([]);
    } finally {
      setCargandoResenas(false);
    }
  };

  const publicarResena = async () => {
    if (!miComentario.trim()) {
      Alert.alert("Atención", "Por favor escribe un comentario para la reseña.");
      return;
    }

    const idCliente = cliente?._id || cliente?.id;

    if (!idCliente) {
      Alert.alert("Inicia sesión", "Debes iniciar sesión para publicar una reseña.");
      return;
    }

    setEnviandoResena(true);
    try {
      await servicioResenas.crear({
        idClient: idCliente,
        idProduct: id,
        rating: miCalificacion,
        comment: miComentario.trim(),
      });

      Alert.alert("¡Gracias!", "Tu reseña se ha publicado con éxito.");
      setMiComentario("");
      setMiCalificacion(5);
      cargarResenas();
    } catch (error) {
      Alert.alert(
        "No se pudo publicar",
        error.message || "Solo puedes reseñar productos que hayas comprado."
      );
    } finally {
      setEnviandoResena(false);
    }
  };

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

  const abrirMenu = () => setMenuVisible(true);

  const imagenes = producto.images || [];
  const hayVariasImagenes = imagenes.length > 1;
  const stockDisponible = Number(producto.stock ?? 0);

  // CÁLCULO DE STOCK DISPONIBLE RESTANDO LO QUE YA ESTÁ EN EL CARRITO
  const itemEnCarrito = carrito.find(
    (i) => (i.idProduct?._id || i.idProduct) === id
  );
  const cantidadEnCarrito = itemEnCarrito
    ? Number(itemEnCarrito.amount || itemEnCarrito.quantity || 0)
    : 0;
  const stockMaximoDisponible = Math.max(0, stockDisponible - cantidadEnCarrito);

  const agotado = stockDisponible <= 0;
  const limiteSuperadoConCarrito = stockMaximoDisponible <= 0;

  // CÁLCULO DE PROMEDIO DE RESEÑAS
  const listaResenasValida = Array.isArray(resenas) ? resenas : [];
  const promedioResenas = listaResenasValida.length
    ? (
        listaResenasValida.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
        listaResenasValida.length
      ).toFixed(1)
    : "0.0";

  const irImagenAnterior = () =>
    setIndiceImagen((actual) => (actual === 0 ? imagenes.length - 1 : actual - 1));
  const irImagenSiguiente = () =>
    setIndiceImagen((actual) => (actual === imagenes.length - 1 ? 0 : actual + 1));

  const bajarCantidad = () => setCantidad((actual) => Math.max(1, actual - 1));
  const subirCantidad = () =>
    setCantidad((actual) =>
      stockMaximoDisponible > 0
        ? Math.min(stockMaximoDisponible, actual + 1)
        : actual
    );

  const manejarAgregarAlCarrito = async () => {
    if (cantidad + cantidadEnCarrito > stockDisponible) {
      Alert.alert(
        "Límite de stock alcanzado",
        `Ya tienes ${cantidadEnCarrito} en el carrito. El stock total disponible es ${stockDisponible}.`
      );
      return;
    }

    setAgregando(true);
    try {
      await agregarProducto(producto._id, cantidad);
      Alert.alert("Producto agregado", `${producto.name} se agregó al carrito.`);
      setCantidad(1);
    } catch (error) {
      Alert.alert("No se pudo agregar", error.message);
    } finally {
      setAgregando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <EncabezadoInicio
        mostrarBuscador={false}
        onPresionarCarrito={() =>
          navigation.navigate("Principal", { screen: "Carrito" })
        }
        onPresionarMenu={abrirMenu}
      />
      <MenuDesplegable
        visible={menuVisible}
        onCerrar={() => setMenuVisible(false)}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* BOTÓN VOLVER */}
        <Pressable
          style={estilos.volver}
          onPress={() => navigation.goBack()}
          hitSlop={8}
        >
          <Text style={estilos.textoVolver}>‹ volver a inicio</Text>
        </Pressable>

        {/* CARRUSEL DE IMÁGENES */}
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
              <Pressable
                style={[estilos.flecha, estilos.flechaIzquierda]}
                onPress={irImagenAnterior}
              >
                <Ionicons name="chevron-back" size={22} color={colores.texto} />
              </Pressable>
              <Pressable
                style={[estilos.flecha, estilos.flechaDerecha]}
                onPress={irImagenSiguiente}
              >
                <Ionicons name="chevron-forward" size={22} color={colores.texto} />
              </Pressable>
            </>
          )}
        </View>

        {/* DETALLES DEL PRODUCTO */}
        <View style={estilos.info}>
          {producto.idBrand?.name ? (
            <Text style={estilos.marca}>{producto.idBrand.name}</Text>
          ) : null}
          <Text style={estilos.nombre}>{producto.name}</Text>

          {/* PROMEDIO DE RESEÑAS */}
          <View style={estilos.filaPromedioResenas}>
            <Ionicons name="star" size={18} color="#FFB800" />
            <Text style={estilos.textoPromedio}>{promedioResenas}</Text>
            <Text style={estilos.totalResenas}>
              ({listaResenasValida.length} valoraciones)
            </Text>
          </View>

          {producto.color ? (
            <View style={estilos.filaColor}>
              <MuestraColor color={producto.color} tamano={26} seleccionada />
              <Text style={estilos.textoColor}>{producto.color}</Text>
            </View>
          ) : null}

          {/* ACCIONES: PRECIO, CANTIDAD, BOTÓN CARRITO */}
          <View style={estilos.filaAccion}>
            <Text style={estilos.precio}>
              ${Number(producto.price ?? 0).toFixed(2)}
            </Text>

            <View style={estilos.selectorCantidad}>
              <Pressable
                style={estilos.botonCantidad}
                onPress={bajarCantidad}
                disabled={cantidad <= 1 || limiteSuperadoConCarrito}
                hitSlop={8}
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={
                    cantidad <= 1 || limiteSuperadoConCarrito
                      ? colores.textoClaro
                      : colores.texto
                  }
                />
              </Pressable>
              <Text style={estilos.cantidad}>
                {limiteSuperadoConCarrito ? 0 : cantidad}
              </Text>
              <Pressable
                style={estilos.botonCantidad}
                onPress={subirCantidad}
                disabled={
                  limiteSuperadoConCarrito || cantidad >= stockMaximoDisponible
                }
                hitSlop={8}
              >
                <Ionicons
                  name="add"
                  size={16}
                  color={
                    limiteSuperadoConCarrito ||
                    cantidad >= stockMaximoDisponible
                      ? colores.textoClaro
                      : colores.texto
                  }
                />
              </Pressable>
            </View>

            <Pressable
              style={[
                estilos.botonAgregar,
                (agotado || limiteSuperadoConCarrito) &&
                  estilos.botonAgregarDeshabilitado,
              ]}
              onPress={manejarAgregarAlCarrito}
              disabled={agotado || limiteSuperadoConCarrito || agregando}
            >
              {agregando ? (
                <ActivityIndicator size="small" color={colores.primario} />
              ) : (
                <Ionicons
                  name="bag-add-outline"
                  size={20}
                  color={colores.primario}
                />
              )}
            </Pressable>
          </View>

          {/* AVISOS DE STOCK */}
          {agotado ? (
            <Text style={estilos.avisoAgotado}>Producto agotado</Text>
          ) : limiteSuperadoConCarrito ? (
            <Text style={estilos.avisoAgotado}>
              Ya tienes todas las unidades disponibles ({stockDisponible}) en tu
              carrito.
            </Text>
          ) : cantidadEnCarrito > 0 ? (
            <Text style={estilos.avisoCarrito}>
              Tienes {cantidadEnCarrito} en el carrito. Disponibles para agregar:{" "}
              {stockMaximoDisponible}.
            </Text>
          ) : null}

          {/* DESCRIPCIÓN */}
          {producto.description ? (
            <>
              <Text style={estilos.tituloDescripcion}>Descripción</Text>
              <Text style={estilos.descripcion}>{producto.description}</Text>
            </>
          ) : null}

          {/* SECCIÓN DE RESEÑAS Y VALORACIONES */}
          <View style={estilos.seccionResenas}>
            <Text style={estilos.tituloSeccion}>Reseñas de clientes</Text>

            {/* FORMULARIO DE RESEÑA */}
            <View style={estilos.tarjetaFormularioResena}>
              <Text style={estilos.subtituloFormulario}>
                Califica este producto
              </Text>
              <View style={estilos.filaEstrellasFormulario}>
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <Pressable
                    key={estrella}
                    onPress={() => setMiCalificacion(estrella)}
                  >
                    <Ionicons
                      name={estrella <= miCalificacion ? "star" : "star-outline"}
                      size={28}
                      color="#FFB800"
                      style={{ marginRight: 6 }}
                    />
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={estilos.inputComentario}
                placeholder="Escribe tu opinión sobre el producto..."
                placeholderTextColor={colores.textoClaro}
                multiline
                numberOfLines={3}
                value={miComentario}
                onChangeText={setMiComentario}
              />

              <Pressable
                style={[
                  estilos.botonPublicar,
                  enviandoResena && { opacity: 0.6 },
                ]}
                onPress={publicarResena}
                disabled={enviandoResena}
              >
                {enviandoResena ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={estilos.textoBotonPublicar}>Publicar reseña</Text>
                )}
              </Pressable>
            </View>

            {/* LISTA DE RESEÑAS */}
            {cargandoResenas ? (
              <ActivityIndicator
                color={colores.primario}
                style={{ marginTop: 16 }}
              />
            ) : listaResenasValida.length === 0 ? (
              <Text style={estilos.textoSinResenas}>
                Aún no hay reseñas para este producto. ¡Sé el primero en calificarlo!
              </Text>
            ) : (
              listaResenasValida.map((item, index) => (
                <View key={item._id || index} style={estilos.tarjetaResena}>
                  <View style={estilos.encabezadoResena}>
                    <Text style={estilos.nombreCliente}>
                      {item.idClient?.name || "Cliente"}
                    </Text>
                    <View style={estilos.filaEstrellasInsignia}>
                      {[1, 2, 3, 4, 5].map((e) => (
                        <Ionicons
                          key={e}
                          name={e <= item.rating ? "star" : "star-outline"}
                          size={14}
                          color="#FFB800"
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={estilos.comentarioResena}>{item.comment}</Text>
                  {item.reviewDate && (
                    <Text style={estilos.fechaResena}>
                      {new Date(item.reviewDate).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>
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
  filaPromedioResenas: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  textoPromedio: {
    fontSize: 14,
    fontWeight: "700",
    color: colores.texto,
    marginLeft: 6,
  },
  totalResenas: { fontSize: 12, color: colores.textoClaro, marginLeft: 6 },
  filaColor: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  textoColor: {
    marginLeft: 10,
    fontSize: 14,
    color: colores.texto,
    fontWeight: "600",
  },
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
  avisoAgotado: {
    marginTop: 10,
    fontSize: 12,
    color: colores.error,
    fontWeight: "600",
  },
  avisoCarrito: {
    marginTop: 10,
    fontSize: 12,
    color: colores.acento,
    fontWeight: "600",
  },
  tituloDescripcion: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: "700",
    color: colores.texto,
  },
  descripcion: {
    fontSize: 14,
    color: colores.textoClaro,
    marginTop: 8,
    lineHeight: 20,
  },
  seccionResenas: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "700",
    color: colores.texto,
    marginBottom: 14,
  },
  tarjetaFormularioResena: {
    backgroundColor: colores.fondoCampo,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  subtituloFormulario: {
    fontSize: 13,
    fontWeight: "600",
    color: colores.texto,
    marginBottom: 8,
  },
  filaEstrellasFormulario: { flexDirection: "row", marginBottom: 12 },
  inputComentario: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: colores.texto,
    textAlignVertical: "top",
    minHeight: 70,
    marginBottom: 12,
  },
  botonPublicar: {
    backgroundColor: colores.primario,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  textoBotonPublicar: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  textoSinResenas: {
    fontSize: 13,
    color: colores.textoClaro,
    fontStyle: "italic",
    marginTop: 6,
  },
  tarjetaResena: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  encabezadoResena: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombreCliente: { fontSize: 13, fontWeight: "700", color: colores.texto },
  filaEstrellasInsignia: { flexDirection: "row" },
  comentarioResena: {
    fontSize: 13,
    color: colores.texto,
    marginTop: 6,
    lineHeight: 18,
  },
  fechaResena: {
    fontSize: 11,
    color: colores.textoClaro,
    marginTop: 6,
    textAlign: "right",
  },
});

export default DetalleProductoPantalla;