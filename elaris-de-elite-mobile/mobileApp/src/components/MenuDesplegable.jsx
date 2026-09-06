import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { useProductos } from "../hooks/useProductos.js";
import { colores } from "../theme/colores.js";
import { capitalizar } from "../utils/formatoTexto.js";

// Menú desplegable de la app: se abre desde el ícono de hamburguesa del
// encabezado y da acceso a inicio, perfil, categorías de productos,
// carrito, términos y cerrar sesión, tal como en el diseño de referencia.
export const MenuDesplegable = ({ visible, onCerrar, navigation }) => {
  const { cerrarSesion } = useAutenticacion();
  const { categorias } = useProductos();
  const [productosAbierto, setProductosAbierto] = useState(false);

  const categoriasDisponibles = categorias.filter((c) => c !== "TODOS");

  const irA = (pantalla, params) => {
    onCerrar();
    navigation.navigate(pantalla, params);
  };

  const manejarCerrarSesion = async () => {
    onCerrar();
    try {
      await cerrarSesion();
    } catch (error) {
      Alert.alert("No se pudo cerrar sesión", error.message);
    }
  };

  const verTerminos = () => {
    Alert.alert(
      "Términos y condiciones",
      "Este contenido estará disponible próximamente.",
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onCerrar}>
      <Pressable style={estilos.fondo} onPress={onCerrar}>
        <Pressable style={estilos.panel} onPress={() => {}}>
          <View style={estilos.encabezado}>
            <Text style={estilos.titulo}>Menú</Text>
            <Ionicons
              name="close-outline"
              size={22}
              color={colores.texto}
              onPress={onCerrar}
            />
          </View>

          <ScrollView>
            <Pressable style={estilos.item} onPress={() => irA("Principal", { screen: "Inicio" })}>
              <Ionicons name="home-outline" size={18} color={colores.texto} />
              <Text style={estilos.textoItem}>Inicio</Text>
            </Pressable>

            <Pressable style={estilos.item} onPress={() => irA("Principal", { screen: "Perfil" })}>
              <Ionicons name="person-outline" size={18} color={colores.texto} />
              <Text style={estilos.textoItem}>Mi perfil</Text>
            </Pressable>

            <Pressable
              style={estilos.item}
              onPress={() => setProductosAbierto((actual) => !actual)}
            >
              <Ionicons name="flask-outline" size={18} color={colores.texto} />
              <Text style={estilos.textoItem}>Productos</Text>
              <Ionicons
                name={productosAbierto ? "chevron-up" : "chevron-down"}
                size={16}
                color={colores.textoClaro}
                style={estilos.flechaSubmenu}
              />
            </Pressable>

            {productosAbierto &&
              categoriasDisponibles.map((categoria) => (
                <Pressable
                  key={categoria}
                  style={estilos.subItem}
                  onPress={() => irA("Categoria", { categoria })}
                >
                  <Text style={estilos.textoSubItem}>{capitalizar(categoria)}</Text>
                </Pressable>
              ))}

            <Pressable style={estilos.item} onPress={() => irA("Principal", { screen: "Carrito" })}>
              <Ionicons name="cart-outline" size={18} color={colores.texto} />
              <Text style={estilos.textoItem}>Carrito de compras</Text>
            </Pressable>

            <Pressable style={estilos.item} onPress={verTerminos}>
              <Ionicons name="document-text-outline" size={18} color={colores.texto} />
              <Text style={estilos.textoItem}>Términos y condiciones</Text>
            </Pressable>

            <Pressable style={[estilos.item, estilos.itemSalir]} onPress={manejarCerrarSesion}>
              <Ionicons name="log-out-outline" size={18} color={colores.error} />
              <Text style={[estilos.textoItem, estilos.textoSalir]}>Cerrar sesión</Text>
            </Pressable>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const estilos = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: "rgba(31,27,24,0.35)", alignItems: "flex-end" },
  panel: {
    width: "62%",
    maxWidth: 260,
    height: "100%",
    backgroundColor: colores.fondoTarjeta,
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titulo: { fontSize: 14, fontWeight: "700", color: colores.texto },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  textoItem: { marginLeft: 10, fontSize: 13, fontWeight: "600", color: colores.texto },
  flechaSubmenu: { marginLeft: "auto" },
  subItem: { paddingVertical: 8, paddingLeft: 28 },
  textoSubItem: { fontSize: 12, color: colores.textoClaro },
  itemSalir: { borderBottomWidth: 0, marginTop: 4 },
  textoSalir: { color: colores.error },
});

export default MenuDesplegable;
