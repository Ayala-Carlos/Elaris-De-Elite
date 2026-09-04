import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colores } from "../theme/colores.js";

// Campo de texto reutilizable con etiqueta y mensaje de error,
// siguiendo el mismo patrón visual que "CajaTexto" en la app web.
export const CampoTexto = ({
  etiqueta,
  valor,
  onCambiar,
  marcador = "",
  error,
  secreto = false,
  tipoTeclado = "default",
  autoCapitalizar = "none",
  estilo,
}) => {
  const [enFoco, setEnFoco] = useState(false);

  return (
    <View style={[estilos.contenedor, estilo]}>
      {etiqueta ? <Text style={estilos.etiqueta}>{etiqueta}</Text> : null}
      <TextInput
        value={valor}
        onChangeText={onCambiar}
        placeholder={marcador}
        placeholderTextColor={colores.textoClaro}
        secureTextEntry={secreto}
        keyboardType={tipoTeclado}
        autoCapitalize={autoCapitalizar}
        onFocus={() => setEnFoco(true)}
        onBlur={() => setEnFoco(false)}
        style={[
          estilos.campo,
          enFoco && estilos.campoEnFoco,
          error && estilos.campoConError,
        ]}
      />
      {error ? <Text style={estilos.error}>{error}</Text> : null}
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { width: "100%", marginBottom: 16 },
  etiqueta: {
    fontSize: 13,
    fontWeight: "600",
    color: colores.texto,
    marginBottom: 6,
  },
  campo: {
    backgroundColor: colores.fondoCampo,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colores.texto,
    borderWidth: 1,
    borderColor: "transparent",
  },
  campoEnFoco: { borderColor: colores.primario },
  campoConError: { borderColor: colores.error },
  error: { fontSize: 12, color: colores.error, marginTop: 4 },
});

export default CampoTexto;
