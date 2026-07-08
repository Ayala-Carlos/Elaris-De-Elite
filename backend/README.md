# Élaris de Élite — Backend (API REST)

API REST construida con **Node.js**, **Express** y **MongoDB (Mongoose)** que sirve tanto a la tienda pública (`elaris-de-elite-client`) como al panel de administración (`elaris-de-elite-admin`).

## Tecnologías y librerías principales

| Librería | Uso |
|---|---|
| `express` | Framework del servidor y enrutamiento |
| `mongoose` | Modelado de datos y conexión a MongoDB |
| `jsonwebtoken` | Autenticación basada en JWT (cookies httpOnly) |
| `bcryptjs` / `bcrypt` | Hasheo de contraseñas |
| `cookie-parser` | Lectura de cookies en las peticiones |
| `cors` | Habilita peticiones cross-origin desde los frontends |
| `multer` + `multer-storage-cloudinary` + `cloudinary` | Subida y almacenamiento de imágenes (productos, marcas) |
| `nodemailer` | Envío de correos (confirmación de cuenta, recuperación de contraseña) |
| `dotenv` | Carga de variables de entorno |

## Requisitos

- Node.js 18+
- Una base de datos MongoDB (local o Atlas)
- Una cuenta de Gmail para el envío de correos (con contraseña de aplicación)
- Una cuenta de Cloudinary (para las imágenes de productos y marcas)

## Instalación y ejecución

```bash
cd backend
npm install
```

Crea un archivo `.env` en `backend/` usando `.env.example` como referencia:

```bash
cp .env.example .env
```

Variables de entorno requeridas (ver `config.js`):

| Variable | Descripción |
|---|---|
| `DB_URI` | Cadena de conexión de MongoDB |
| `JWT_Secret_key` | Secreto usado para firmar los tokens JWT |
| `USER_EMAIL` | Correo Gmail remitente de las notificaciones |
| `USER_PASSWORD` | Contraseña de aplicación de ese correo |
| `CLOUDINARY_CLOUD_NAME` | Nombre de la cuenta de Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |

Levantar el servidor:

```bash
node index.js
```

El servidor queda escuchando en `http://localhost:3000`.

## Estructura del proyecto

```
backend/
├── index.js              # Punto de entrada: arranca el servidor
├── app.js                 # Configuración de Express (cors, cookies, rutas)
├── database.js             # Conexión a MongoDB
├── config.js                # Lectura centralizada de variables de entorno
└── src/
    ├── routes/              # Definición de endpoints por recurso
    ├── controllers/         # Lógica de negocio de cada recurso
    ├── models/              # Esquemas de Mongoose
    ├── middlewares/         # adminAuth / customerAuth (protección de rutas)
    └── utils/                # Cloudinary config, plantillas de correo
```

## Autenticación y autorización

La API usa dos cookies **httpOnly** independientes, una por rol, para evitar que la sesión de un administrador y la de un cliente se sobrescriban entre sí:

- `adminAuthCookie` — emitida en `POST /api/loginAdmin`, verificada por el middleware `adminAuth`.
- `customerAuthCookie` — emitida en `POST /api/login`, verificada por el middleware `customerAuth`.

`POST /api/logout` limpia ambas cookies (lo usan los dos frontends).

Reglas generales de autorización:

- Los **catálogos de lectura pública** (listar/ver productos, categorías, marcas, reseñas) no requieren sesión.
- Crear/editar/eliminar productos, categorías, marcas, códigos de descuento, campañas de marketing, y gestionar clientes/pedidos/administradores requiere `adminAuth`.
- Todo lo relacionado al carrito propio, crear pedidos, actualizar el propio perfil y dejar reseñas requiere `customerAuth`, y además se valida que el recurso pertenezca al cliente autenticado (por ejemplo, no se puede actualizar el carrito de otro cliente).
- Las reseñas solo pueden crearse sobre productos que el cliente ya haya comprado (carrito con estado `completed` que contenga ese producto).

## Endpoints principales

| Recurso | Base path | Notas |
|---|---|---|
| Productos | `/api/products` | Lectura pública, escritura solo admin |
| Categorías | `/api/categories` | Lectura pública, escritura solo admin |
| Marcas | `/api/brands` | Lectura pública, escritura solo admin |
| Clientes | `/api/customers` | Listado/borrado solo admin, edición propia solo el dueño |
| Administradores | `/api/administrators` | Solo admin autenticado |
| Login cliente | `/api/login` | Público |
| Login admin | `/api/loginAdmin` | Público |
| Registro de clientes | `/api/registerCustomers` | Público, con verificación de correo |
| Registro de admin | `/api/registerAdmin` | Solo un admin autenticado puede crear otro |
| Recuperación de contraseña | `/api/recoveryPassword` | Público, por correo electrónico |
| Carrito | `/api/cart` | Solo el cliente dueño del carrito |
| Pedidos | `/api/orders` | Crear/ver historial: cliente dueño. Listar todos/editar/eliminar: admin |
| Reseñas | `/api/reviews` | Lectura pública, creación del cliente (solo si compró el producto), edición/borrado solo admin |
| Códigos de descuento | `/api/discountCodes` | Listado/gestión solo admin, validación de código: cliente autenticado |
| Campañas de marketing | `/api/marketingCampaings` | Solo admin |
| Contacto | `/api/contact` | Público |
