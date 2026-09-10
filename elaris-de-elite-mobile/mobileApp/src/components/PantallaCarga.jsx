import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { Logo } from "./Logo.jsx";
import { colores } from "../theme/colores.js";

// Pantalla de carga personalizada de la app: se muestra justo después de que
// el Splash Screen nativo (ver app.json) desaparece, mientras se revisa si
// hay una sesión de cliente guardada (ver NavegadorPrincipal.jsx). Con esto
// la transición del Splash Screen a la app nunca se siente como un salto
// brusco a una pantalla en blanco con un simple spinner.
export const PantallaCarga = () => {
  const escala = useRef(new Animated.Value(0.85)).current;
  const opacidad = useRef(new Animated.Value(0)).current;
  const opacidadTexto = useRef(new Animated.Value(0)).current;
  const pulso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(escala, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(opacidad, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacidadTexto, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Puntos de "cargando..." pulsando en bucle mientras se resuelve la sesión.
    const bucle = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    );
    bucle.start();
    return () => bucle.stop();
  }, [escala, opacidad, opacidadTexto, pulso]);

  return (
    <View style={estilos.contenedor}>
      <Animated.View style={{ opacity: opacidad, transform: [{ scale: escala }] }}>
        <Logo tamano={150} />
      </Animated.View>

      <Animated.View style={{ opacity: opacidadTexto, alignItems: "center" }}>
        <Text style={estilos.marca}>ÉLARIS DE ÉLITE</Text>
        <Text style={estilos.eslogan}>Tu poder, tu belleza</Text>
      </Animated.View>

      <View style={estilos.filaPuntos}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              estilos.punto,
              {
                opacity: pulso.interpolate({
                  inputRange: [0, 1],
                  outputRange: i === 1 ? [0.3, 1] : [1, 0.3],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colores.fondo,
  },
  marca: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: "700",
    color: colores.acento,
    letterSpacing: 1.5,
  },
  eslogan: {
    marginTop: 4,
    fontSize: 12,
    color: colores.textoClaro,
    fontStyle: "italic",
  },
  filaPuntos: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colores.primario,
    marginHorizontal: 4,
  },
});

export default PantallaCarga;
