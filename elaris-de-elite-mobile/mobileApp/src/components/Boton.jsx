import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../theme/colores.js";

const ESTILOS_POR_TIPO = {
  primario: {
    contenedor: { backgroundColor: colores.primario },
    texto: { color: colores.blanco },
  },
  secundario: {
    contenedor: { backgroundColor: colores.fondoCampo },
    texto: { color: colores.texto },
  },
  contorno: {
    contenedor: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: colores.primario,
    },
    texto: { color: colores.primario },
  },
};

// Botón reutilizable de la app. tipo: "primario" | "secundario" | "contorno".
export const Boton = ({
  children,
  tipo = "primario",
  anchoCompleto = true,
  deshabilitado = false,
  cargando = false,
  onPress,
  estilo,
}) => {
  const estilosTipo = ESTILOS_POR_TIPO[tipo] ?? ESTILOS_POR_TIPO.primario;

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado || cargando}
      style={({ pressed }) => [
        estilosBase.contenedor,
        estilosTipo.contenedor,
        anchoCompleto && estilosBase.anchoCompleto,
        (deshabilitado || cargando) && estilosBase.deshabilitado,
        pressed && !deshabilitado && estilosBase.presionado,
        estilo,
      ]}
    >
      {cargando ? (
        <ActivityIndicator color={estilosTipo.texto.color} />
      ) : (
        <Text style={[estilosBase.texto, estilosTipo.texto]}>{children}</Text>
      )}
    </Pressable>
  );
};

const estilosBase = StyleSheet.create({
  contenedor: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  anchoCompleto: { width: "100%" },
  texto: { fontSize: 15, fontWeight: "700" },
  deshabilitado: { opacity: 0.5 },
  presionado: { opacity: 0.85 },
});

export default Boton;
