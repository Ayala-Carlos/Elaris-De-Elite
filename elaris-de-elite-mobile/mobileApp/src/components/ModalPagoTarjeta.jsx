import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Boton } from "./Boton.jsx";
import { CampoTexto } from "./CampoTexto.jsx";
import { colores } from "../theme/colores.js";

const DATOS_INICIALES = { numero: "", nombreEnTarjeta: "", mes: "", anio: "", cvv: "" };

// Tarjeta de prueba verificada contra el sandbox real de Wompi (ver README):
// cualquier otro número puede ser rechazado por Wompi al no reconocerlo
// como una tarjeta de pruebas válida.
const TARJETA_DE_PRUEBA = {
  numero: "4111 1111 1111 1111",
  nombreEnTarjeta: "Cliente de Prueba",
  mes: "12",
  anio: "2030",
  cvv: "123",
};

// Modal de pago con tarjeta (sandbox/pruebas de Wompi) que se abre desde el
// carrito al presionar "Proceder con pago". Solo recolecta los datos de la
// tarjeta; el cobro real (tokenización + transacción) lo hace el backend.
export const ModalPagoTarjeta = ({ visible, total, cargando, onCerrar, onConfirmar }) => {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [errores, setErrores] = useState({});

  const actualizarCampo = (campo) => (valor) =>
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));

  const validar = () => {
    const nuevosErrores = {};
    if (!/^\d{13,19}$/.test(datos.numero.replace(/\s/g, "")))
      nuevosErrores.numero = "Número de tarjeta inválido";
    if (!datos.nombreEnTarjeta.trim()) nuevosErrores.nombreEnTarjeta = "Campo obligatorio";
    const mes = Number(datos.mes);
    if (!mes || mes < 1 || mes > 12) nuevosErrores.mes = "Mes inválido";
    if (!/^\d{2,4}$/.test(datos.anio)) nuevosErrores.anio = "Año inválido";
    if (!/^\d{3,4}$/.test(datos.cvv)) nuevosErrores.cvv = "CVV inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const cerrar = () => {
    if (cargando) return;
    setDatos(DATOS_INICIALES);
    setErrores({});
    onCerrar();
  };

  const confirmar = () => {
    if (!validar()) return;
    onConfirmar(datos);
  };

  const usarTarjetaDePrueba = () => {
    setDatos(TARJETA_DE_PRUEBA);
    setErrores({});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={cerrar}>
      <View style={estilos.fondo}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={estilos.envoltura}
        >
          <View style={estilos.panel}>
            <View style={estilos.encabezado}>
              <Text style={estilos.titulo}>Pagar con tarjeta (modo de prueba)</Text>
              <Pressable onPress={cerrar} hitSlop={8} disabled={cargando}>
                <Ionicons name="close-outline" size={22} color={colores.texto} />
              </Pressable>
            </View>

            <View style={estilos.franjaAviso}>
              <Ionicons name="shield-checkmark-outline" size={16} color={colores.primarioOscuro} />
              <Text style={estilos.aviso}>
                Este es el ambiente de pruebas: ningún dato de tarjeta que ingreses
                aquí genera un cobro real. Wompi sí valida que el número de tarjeta
                tenga un formato válido, así que un número inventado puede ser
                rechazado.{" "}
                <Text style={estilos.enlaceTarjetaPrueba} onPress={usarTarjetaDePrueba}>
                  Usar tarjeta de prueba
                </Text>
              </Text>
            </View>

            <Text style={estilos.total}>Total a pagar: ${Number(total || 0).toFixed(2)}</Text>

            <ScrollView keyboardShouldPersistTaps="handled">
              <CampoTexto
                etiqueta="Número de tarjeta"
                valor={datos.numero}
                onCambiar={actualizarCampo("numero")}
                tipoTeclado="number-pad"
                marcador="0000 0000 0000 0000"
                error={errores.numero}
              />
              <CampoTexto
                etiqueta="Nombre en la tarjeta"
                valor={datos.nombreEnTarjeta}
                onCambiar={actualizarCampo("nombreEnTarjeta")}
                autoCapitalizar="words"
                error={errores.nombreEnTarjeta}
              />

              <View style={estilos.filaTriple}>
                <CampoTexto
                  etiqueta="Mes"
                  valor={datos.mes}
                  onCambiar={actualizarCampo("mes")}
                  tipoTeclado="number-pad"
                  marcador="MM"
                  error={errores.mes}
                  estilo={estilos.tercio}
                />
                <CampoTexto
                  etiqueta="Año"
                  valor={datos.anio}
                  onCambiar={actualizarCampo("anio")}
                  tipoTeclado="number-pad"
                  marcador="AAAA"
                  error={errores.anio}
                  estilo={estilos.tercio}
                />
                <CampoTexto
                  etiqueta="CVV"
                  valor={datos.cvv}
                  onCambiar={actualizarCampo("cvv")}
                  tipoTeclado="number-pad"
                  secreto
                  marcador="123"
                  error={errores.cvv}
                  estilo={estilos.tercio}
                />
              </View>

              <Boton estilo={{ marginTop: 8 }} cargando={cargando} onPress={confirmar}>
                Pagar (modo de prueba)
              </Boton>
              <Boton
                tipo="secundario"
                estilo={{ marginTop: 10 }}
                deshabilitado={cargando}
                onPress={cerrar}
              >
                Cancelar
              </Boton>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const estilos = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: "rgba(31,27,24,0.45)", justifyContent: "flex-end" },
  envoltura: { width: "100%" },
  panel: {
    width: "100%",
    maxHeight: "88%",
    backgroundColor: colores.fondoTarjeta,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titulo: { fontSize: 16, fontWeight: "700", color: colores.texto, flex: 1, marginRight: 10 },
  franjaAviso: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colores.fondoCampo,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  aviso: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "600",
    color: colores.primarioOscuro,
    lineHeight: 17,
  },
  enlaceTarjetaPrueba: {
    color: colores.acento,
    textDecorationLine: "underline",
  },
  total: { fontSize: 14, fontWeight: "700", color: colores.acento, marginBottom: 16 },
  filaTriple: { flexDirection: "row", justifyContent: "space-between" },
  tercio: { width: "31%" },
});

export default ModalPagoTarjeta;
