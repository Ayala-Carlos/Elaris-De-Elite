import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

// Fila del panel "Información personal": muestra una etiqueta y su valor,
// y al presionar el lápiz se convierte en un campo editable con botones
// para guardar o cancelar el cambio.
export const FilaPerfilEditable = ({
  etiqueta,
  valor,
  valorOculto = false,
  marcador,
  tipoTeclado = "default",
  onGuardar,
}) => {
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState("");
  const [guardando, setGuardando] = useState(false);

  const empezarEdicion = () => {
    setBorrador(valorOculto ? "" : String(valor ?? ""));
    setEditando(true);
  };

  const cancelar = () => {
    setEditando(false);
    setBorrador("");
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      await onGuardar(borrador.trim());
      setEditando(false);
      setBorrador("");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={estilos.fila}>
      <Text style={estilos.etiqueta}>{etiqueta}: </Text>

      {editando ? (
        <>
          <TextInput
            value={borrador}
            onChangeText={setBorrador}
            placeholder={marcador}
            placeholderTextColor={colores.textoClaro}
            keyboardType={tipoTeclado}
            secureTextEntry={valorOculto}
            autoCapitalize="none"
            style={estilos.campo}
            autoFocus
          />
          {guardando ? (
            <ActivityIndicator size="small" color={colores.primario} style={estilos.icono} />
          ) : (
            <>
              <Pressable onPress={guardar} hitSlop={8} style={estilos.icono}>
                <Ionicons name="checkmark-outline" size={18} color={colores.exito} />
              </Pressable>
              <Pressable onPress={cancelar} hitSlop={8} style={estilos.icono}>
                <Ionicons name="close-outline" size={18} color={colores.error} />
              </Pressable>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={estilos.valor} numberOfLines={1}>
            {valorOculto ? "••••••••••" : valor || "Sin definir"}
          </Text>
          <Pressable onPress={empezarEdicion} hitSlop={8} style={estilos.icono}>
            <Ionicons name="create-outline" size={16} color={colores.primario} />
          </Pressable>
        </>
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  fila: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  etiqueta: { fontSize: 13, fontWeight: "700", color: colores.texto },
  valor: { flex: 1, fontSize: 13, color: colores.texto },
  campo: {
    flex: 1,
    fontSize: 13,
    color: colores.texto,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: colores.primario,
  },
  icono: { marginLeft: 10 },
});

export default FilaPerfilEditable;
