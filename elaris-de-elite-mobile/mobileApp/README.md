# Élaris de Élite — App Móvil (Cliente)

Aplicación móvil de la tienda, construida con **React Native + Expo**. Permite a los clientes navegar el catálogo, registrarse, iniciar sesión, comprar con carrito y pago con tarjeta (Wompi, en modo de pruebas), dejar reseñas y consultar su historial de pedidos, replicando las funcionalidades de la tienda en línea (`elaris-de-elite-client`).

## Tecnologías y librerías principales

| Librería | Uso |
|---|---|
| `expo` / `react-native` | Framework y runtime de la app móvil |
| `@react-navigation/native`, `native-stack`, `bottom-tabs` | Enrutamiento entre pantallas y barra de pestañas inferior |
| `@react-native-async-storage/async-storage` | Persistencia de la sesión del cliente en el dispositivo |
| `@expo/vector-icons` | Iconografía (Ionicons) |
| `react-native-safe-area-context` / `react-native-screens` | Manejo de áreas seguras y navegación nativa |

## Requisitos previos

- Node.js 18+
- La app de [Expo Go](https://expo.dev/go) (para probar en un dispositivo físico) o un emulador de Android/iOS
- El backend (`backend/`) corriendo en `http://localhost:3000`

## Instalación y ejecución

```bash
cd elaris-de-elite-mobile/mobileApp
npm install
npm start
```

Esto abre el Metro Bundler de Expo: desde ahí se puede escanear el código QR con Expo Go, o presionar `a`/`i` para abrir un emulador de Android/iOS. También existen `npm run android`, `npm run ios` y `npm run web` como atajos directos.

### Configurar la URL del backend

La app toma la URL de la API de la variable de entorno pública `EXPO_PUBLIC_API_URL` (ver `.env` / `.env.example`):

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

`localhost` solo funciona al correr la app en el emulador o en modo web. Al probar en un dispositivo físico con Expo Go, `localhost` apunta al teléfono, no a la computadora que corre el backend, así que hay que reemplazarlo por la IP de la red local de la computadora (ej. `http://192.168.1.50:3000/api`).

## Estructura del proyecto

```
src/
├── screens/       # Pantallas de la app (Bienvenida, IniciarSesion, Registrarse, Inicio, Productos, Carrito, Pedidos, Perfil, ...)
├── components/     # Componentes reutilizables (Boton, CampoTexto, EncabezadoInicio, ModalPagoTarjeta, TarjetaProducto, ...)
├── contexts/         # ContextoAutenticacion y ContextoCarrito (estado global de sesión y carrito)
├── hooks/              # Atajos para consumir los contextos y los productos (useAutenticacion, useCarrito, useProductos)
├── services/            # Wrappers de fetch hacia la API del backend (uno por recurso)
├── navigation/           # NavegadorPrincipal: stack público + pestañas privadas
├── theme/                  # Paleta de colores oficial de la app
└── utils/                    # Utilidades de formato (colores de producto, capitalización)
```

## Funcionalidades principales

- **Catálogo de productos**: listado por categoría en la pantalla de inicio, catálogo completo, detalle de producto con selector de cantidad (`InicioPantalla`, `ProductosPantalla`, `CategoriaPantalla`, `DetalleProductoPantalla`).
- **Autenticación**: registro con confirmación de cuenta por correo electrónico, inicio de sesión y recuperación de contraseña por correo (`RegistrarsePantalla`, `IniciarSesionPantalla`, `VerificarCodigoPantalla`, `RecuperarContrasenaPantalla`).
- **Carrito de compras y pago con Wompi**: agregar/actualizar/eliminar productos, aplicar códigos de descuento y pagar con tarjeta a través de la integración de pruebas (sandbox) de Wompi — ver más abajo (`CarritoPantalla`, `ModalPagoTarjeta`, `ContextoCarrito`).
- **Perfil de usuario**: edición de datos personales (nombre, correo, teléfono, contraseña) y de la dirección de envío (país, estado, ciudad y dirección) campo por campo (`PerfilPantalla`, `FilaPerfilEditable`).
- **Historial de pedidos**: lista de pedidos reales del cliente autenticado, con su estado (en proceso / entregado) (`PedidosPantalla`).
- **Términos y condiciones** (`TerminosPantalla`).

## Pago con tarjeta (Wompi, modo de pruebas)

El botón "Proceder con pago" del carrito abre un formulario de tarjeta (`ModalPagoTarjeta`) y llama a `POST /api/wompi/pay` en el backend, protegido con la sesión del cliente. Ese endpoint orquesta el flujo completo de la [API de Wompi El Salvador](https://api.wompi.sv/index.html) sin exponer nunca las credenciales del comercio a la app:

1. Obtiene un access token OAuth (`client_credentials`) en `https://id.wompi.sv/connect/token`, usando `CLIENT_ID`/`CLIENT_SECRET`/`GRANT_TYPE`/`AUDIENCE` del `.env` del backend.
2. Tokeniza la tarjeta en `https://api.wompi.sv/Tokenizacion` (el número de tarjeta nunca se reenvía a la transacción, solo el token que devuelve este paso).
3. Cobra con `https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds`.

El pedido solo se crea en el backend (`/api/orders`) si Wompi responde con la transacción aprobada (`esAprobada: true`). Al ser un **aplicativo de Wompi en modo de pruebas**, ninguna transacción es un cobro real; hay que usar una tarjeta de prueba del panel de sandbox de Wompi, no una tarjeta real.

## Rutas y navegación

`NavegadorPrincipal` (`src/navigation/NavegadorPrincipal.jsx`) decide el flujo según haya o no una sesión de cliente activa (`useAutenticacion`):

- **Sin sesión**: Bienvenida → Iniciar sesión / Registrarse → Verificar código / Recuperar contraseña.
- **Con sesión**: pestañas inferiores (Carrito, Productos, Inicio, Pedidos, Perfil) más las pantallas de Detalle de producto, Categoría y Términos.

La sesión del cliente se guarda en `AsyncStorage` para no perderla al cerrar la app, y cada petición al backend envía la cookie httpOnly de sesión (`credentials: "include"` en `src/services/api.js`).
