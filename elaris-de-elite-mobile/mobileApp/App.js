import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { ProveedorAutenticacion } from "./src/contexts/ContextoAutenticacion.jsx";
import { ProveedorCarrito } from "./src/contexts/ContextoCarrito.jsx";
import { NavegadorPrincipal } from "./src/navigation/NavegadorPrincipal.jsx";

// Evita que la Splash Screen nativa (ver el plugin "expo-splash-screen" en
// app.json) se oculte sola en cuanto carga el bundle de JS. Solo aplica a
// builds nativos/de desarrollo: dentro de Expo Go, la app siempre muestra su
// propio ícono en vez de la splash personalizada (limitación de Expo Go
// desde el SDK 52, no algo que se pueda configurar).
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // En cuanto React ya montó la app, se oculta la Splash Screen nativa y
  // toma el relevo la pantalla de carga propia (PantallaCarga.jsx, ver
  // NavegadorPrincipal.jsx), para que la transición se sienta continua.
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <ProveedorAutenticacion>
        <ProveedorCarrito>
          <NavegadorPrincipal />
          <StatusBar style="dark" />
        </ProveedorCarrito>
      </ProveedorAutenticacion>
    </SafeAreaProvider>
  );
}
