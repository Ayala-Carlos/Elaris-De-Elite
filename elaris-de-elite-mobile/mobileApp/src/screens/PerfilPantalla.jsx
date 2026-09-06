import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Boton } from "../components/Boton.jsx";
import { EncabezadoInicio } from "../components/EncabezadoInicio.jsx";
import { FilaPerfilEditable } from "../components/FilaPerfilEditable.jsx";
import { MenuDesplegable } from "../components/MenuDesplegable.jsx";
import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";

// Pantalla de perfil del cliente autenticado: información personal
// editable campo por campo y botón para cerrar sesión.
export const PerfilPantalla = ({ navigation }) => {
  const { cliente, actualizarCliente, cerrarSesion } = useAutenticacion();
  const [menuVisible, setMenuVisible] = useState(false);

  const guardarCampo = async (campo, valor) => {
    if ((campo === "name" || campo === "email") && !valor) {
      throw new Error("Este campo no puede quedar vacío");
    }
    try {
      await actualizarCliente({ [campo]: valor });
    } catch (error) {
      Alert.alert("No se pudo actualizar", error.message);
      throw error;
    }
  };

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion();
    } catch (error) {
      Alert.alert("No se pudo cerrar sesión", error.message);
    }
  };

  const editarFoto = () =>
    Alert.alert("Próximamente", "La foto de perfil estará disponible pronto.");

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

      <ScrollView contentContainerStyle={estilos.contenido}>
        <Pressable
          style={estilos.volver}
          onPress={() => navigation.navigate("Inicio")}
          hitSlop={8}
        >
          <Text style={estilos.textoVolver}>‹ volver a inicio</Text>
        </Pressable>

        <View style={estilos.contenedorAvatar}>
          <View style={estilos.avatar}>
            <Ionicons name="person" size={48} color={colores.blanco} />
          </View>
          <Pressable style={estilos.insigniaEditar} onPress={editarFoto} hitSlop={6}>
            <Ionicons name="camera-outline" size={14} color={colores.primario} />
          </Pressable>
        </View>

        <Text style={estilos.nombre}>{cliente?.name || "Cliente Élaris"}</Text>

        <View style={estilos.panel}>
          <Text style={estilos.tituloPanel}>Información personal</Text>

          <FilaPerfilEditable
            etiqueta="Nombre de usuario"
            valor={cliente?.name}
            marcador="Tu nombre"
            onGuardar={(valor) => guardarCampo("name", valor)}
          />
          <FilaPerfilEditable
            etiqueta="Correo"
            valor={cliente?.email}
            marcador="tucorreo@ejemplo.com"
            tipoTeclado="email-address"
            onGuardar={(valor) => guardarCampo("email", valor)}
          />
          <FilaPerfilEditable
            etiqueta="Teléfono"
            valor={cliente?.phoneNumber}
            marcador="10 dígitos"
            tipoTeclado="phone-pad"
            onGuardar={(valor) => guardarCampo("phoneNumber", valor)}
          />
          <FilaPerfilEditable
            etiqueta="Contraseña"
            valor={cliente?.password}
            valorOculto
            marcador="Nueva contraseña"
            onGuardar={(valor) => guardarCampo("password", valor)}
          />
          <FilaPerfilEditable
            etiqueta="País"
            valor={cliente?.country}
            marcador="Ej. El Salvador"
            onGuardar={(valor) => guardarCampo("country", valor)}
          />
          <FilaPerfilEditable
            etiqueta="Dirección"
            valor={cliente?.address}
            marcador="Ej. San Salvador, San Salvador"
            onGuardar={(valor) => guardarCampo("address", valor)}
          />
        </View>

        <Boton tipo="contorno" estilo={estilos.boton} onPress={manejarCerrarSesion}>
          Cerrar sesión
        </Boton>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  contenido: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 40 },
  volver: { alignSelf: "flex-start", paddingTop: 14, paddingBottom: 4 },
  textoVolver: { color: colores.acento, fontSize: 13, fontWeight: "600" },
  contenedorAvatar: { marginTop: 16 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colores.textoClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  insigniaEditar: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colores.fondoTarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: "center",
    justifyContent: "center",
  },
  nombre: { fontSize: 18, fontWeight: "700", color: colores.texto, marginTop: 14 },
  panel: {
    width: "100%",
    backgroundColor: colores.fondoCampo,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  tituloPanel: { fontSize: 14, fontWeight: "700", color: colores.texto, marginBottom: 6 },
  boton: { width: "100%", marginTop: 28 },
});

export default PerfilPantalla;
