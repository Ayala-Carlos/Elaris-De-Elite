import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores.js";

// Mismo contenido que la página web (ver TerminosCondiciones.jsx del
// proyecto elaris-de-elite-client), adaptado a tarjetas para la app móvil.
const SECCIONES = [
  {
    icono: "alert-circle-outline",
    color: colores.acento,
    fondoIcono: "#FDECEA",
    titulo: "Bienvenido a Élaris de Elite",
    texto:
      "Estos términos y condiciones describen las reglas y regulaciones para el uso de la aplicación de Élaris de Elite. Al acceder a esta app, asumimos que aceptas estos términos y condiciones. No continúes usando Élaris de Elite si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.",
  },
  {
    icono: "cube-outline",
    color: colores.texto,
    fondoIcono: "#E8E0DA",
    titulo: "1. Licencia de uso",
    texto:
      "A menos que se indique lo contrario, Élaris de Elite y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Élaris de Elite. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde Élaris de Elite para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.",
  },
  {
    icono: "card-outline",
    color: colores.primario,
    fondoIcono: "#F5E9DA",
    titulo: "2. Compra y pagos",
    texto:
      "Todos los pagos se procesan de forma segura. Al realizar una compra confirmas que la información de pago proporcionada es correcta y autorizas el cobro del monto total del pedido, incluyendo impuestos y costos de envío aplicables.",
  },
  {
    icono: "car-outline",
    color: colores.primario,
    fondoIcono: "#F5E9DA",
    titulo: "3. Envíos y devoluciones",
    texto:
      "Los plazos de entrega varían según tu ubicación. Los productos pueden ser devueltos dentro de los 30 días posteriores a la recepción, siempre que estén en su estado original y sin usar.",
  },
];

export const TerminosPantalla = ({ navigation }) => {
  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Pressable style={estilos.botonVolver} onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={estilos.textoVolver}>‹ volver</Text>
        </Pressable>

        <Text style={estilos.etiqueta}>Nuestras políticas de uso</Text>
        <Text style={estilos.titulo}>Términos y condiciones</Text>
        <Text style={estilos.actualizacion}>Última actualización: 5 de marzo de 2026</Text>

        {SECCIONES.map((seccion) => (
          <View key={seccion.titulo} style={estilos.tarjeta}>
            <View style={estilos.filaTitulo}>
              <View style={[estilos.iconoContenedor, { backgroundColor: seccion.fondoIcono }]}>
                <Ionicons name={seccion.icono} size={18} color={seccion.color} />
              </View>
              <Text style={estilos.tituloSeccion}>{seccion.titulo}</Text>
            </View>
            <Text style={estilos.textoSeccion}>{seccion.texto}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  scroll: { padding: 24, paddingTop: 16, paddingBottom: 40 },
  botonVolver: { marginBottom: 16 },
  textoVolver: { fontSize: 12, color: colores.secundario, fontWeight: "600" },
  etiqueta: {
    fontSize: 12,
    fontWeight: "600",
    color: colores.acento,
    textAlign: "center",
    marginBottom: 6,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: colores.texto,
    textAlign: "center",
  },
  actualizacion: {
    fontSize: 12,
    color: colores.textoClaro,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  tarjeta: {
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filaTitulo: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  iconoContenedor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tituloSeccion: { flex: 1, fontSize: 14, fontWeight: "700", color: colores.texto },
  textoSeccion: { fontSize: 13, color: colores.textoClaro, lineHeight: 20 },
});

export default TerminosPantalla;
