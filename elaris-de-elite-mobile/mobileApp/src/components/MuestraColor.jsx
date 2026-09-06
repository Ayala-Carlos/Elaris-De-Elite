import { StyleSheet, View } from "react-native";
import { colores } from "../theme/colores.js";
import { obtenerColorMuestra } from "../utils/colorProducto.js";

// Círculo decorativo que representa el color de un producto
// (rubores, labiales, etc.), usado en la cuadrícula de categoría
// y en el detalle de producto.
export const MuestraColor = ({ color, tamano = 18, seleccionada = false }) => (
  <View
    style={[
      estilos.circulo,
      {
        width: tamano,
        height: tamano,
        borderRadius: tamano / 2,
        backgroundColor: obtenerColorMuestra(color),
      },
      seleccionada && estilos.seleccionada,
    ]}
  />
);

const estilos = StyleSheet.create({
  circulo: {
    borderWidth: 1,
    borderColor: colores.borde,
  },
  seleccionada: {
    borderWidth: 2,
    borderColor: colores.primario,
  },
});

export default MuestraColor;
