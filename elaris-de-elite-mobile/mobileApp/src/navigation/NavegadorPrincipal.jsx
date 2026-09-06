import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useAutenticacion } from "../hooks/useAutenticacion.js";
import { colores } from "../theme/colores.js";

import { BienvenidaPantalla } from "../screens/BienvenidaPantalla.jsx";
import { IniciarSesionPantalla } from "../screens/IniciarSesionPantalla.jsx";
import { RegistrarsePantalla } from "../screens/RegistrarsePantalla.jsx";
import { RecuperarContrasenaPantalla } from "../screens/RecuperarContrasenaPantalla.jsx";
import { InicioPantalla } from "../screens/InicioPantalla.jsx";
import { ProductosPantalla } from "../screens/ProductosPantalla.jsx";
import { CarritoPantalla } from "../screens/CarritoPantalla.jsx";
import { PedidosPantalla } from "../screens/PedidosPantalla.jsx";
import { PerfilPantalla } from "../screens/PerfilPantalla.jsx";
import { DetalleProductoPantalla } from "../screens/DetalleProductoPantalla.jsx";
import { CategoriaPantalla } from "../screens/CategoriaPantalla.jsx";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const ICONOS_PESTANAS = {
  Carrito: "cart-outline",
  Productos: "flask-outline",
  Inicio: "home-outline",
  Pedidos: "receipt-outline",
  Perfil: "person-outline",
};

// Barra inferior con las secciones principales, ya con sesión iniciada.
const PestanasPrincipales = () => (
  <Tabs.Navigator
    initialRouteName="Inicio"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colores.primario,
      tabBarInactiveTintColor: colores.textoClaro,
      tabBarStyle: { borderTopColor: colores.borde },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={ICONOS_PESTANAS[route.name]} size={size} color={color} />
      ),
    })}
  >
    <Tabs.Screen name="Carrito" component={CarritoPantalla} />
    <Tabs.Screen name="Productos" component={ProductosPantalla} />
    <Tabs.Screen name="Inicio" component={InicioPantalla} />
    <Tabs.Screen name="Pedidos" component={PedidosPantalla} />
    <Tabs.Screen name="Perfil" component={PerfilPantalla} />
  </Tabs.Navigator>
);

// Controla el flujo completo de navegación: pantallas públicas
// (bienvenida, inicio de sesión, registro) y la app principal una vez
// que hay una sesión de cliente activa.
export const NavegadorPrincipal = () => {
  const { haIniciadoSesion, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colores.fondo,
        }}
      >
        <ActivityIndicator color={colores.primario} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {haIniciadoSesion ? (
          <>
            <Stack.Screen name="Principal" component={PestanasPrincipales} />
            <Stack.Screen name="DetalleProducto" component={DetalleProductoPantalla} />
            <Stack.Screen name="Categoria" component={CategoriaPantalla} />
          </>
        ) : (
          <>
            <Stack.Screen name="Bienvenida" component={BienvenidaPantalla} />
            <Stack.Screen name="IniciarSesion" component={IniciarSesionPantalla} />
            <Stack.Screen name="Registrarse" component={RegistrarsePantalla} />
            <Stack.Screen
              name="RecuperarContrasena"
              component={RecuperarContrasenaPantalla}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorPrincipal;
