import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ProveedorAutenticacion } from "./src/contexts/ContextoAutenticacion.jsx";
import { ProveedorCarrito } from "./src/contexts/ContextoCarrito.jsx";
import { NavegadorPrincipal } from "./src/navigation/NavegadorPrincipal.jsx";

export default function App() {
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
