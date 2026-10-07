# Élaris de Élite

**Élaris de Élite** es una empresa dedicada a la comercialización de maquillaje premium, orientada a ofrecer productos cuidadosamente seleccionados que realzan la belleza natural y fortalecen la confianza y la autoexpresión de cada mujer. La marca se distingue por su enfoque en la calidad, la estética y una experiencia de compra personalizada, integrando tendencias actuales de belleza con un servicio exclusivo y cercano.

Este repositorio contiene la tienda en línea completa: la API backend, la tienda pública para clientes y el panel de administración.

---

## Estructura del repositorio

```
Elaris-De-Elite/
├── backend/                          # API REST (Node.js + Express + MongoDB)
├── elaris-de-elite-client/           # Tienda pública para clientes (React + Vite)
├── elaris-de-elite-admin/            # Panel de administración (React + Vite)
└── elaris-de-elite-mobile/mobileApp/ # App móvil para clientes (React Native + Expo)
```

Cada subproyecto tiene su propio `README.md` con instrucciones detalladas de instalación, variables de entorno y estructura interna:

- [`backend/README.md`](./backend/README.md)
- [`elaris-de-elite-client/README.md`](./elaris-de-elite-client/README.md)
- [`elaris-de-elite-admin/README.md`](./elaris-de-elite-admin/README.md)
- [`elaris-de-elite-mobile/mobileApp/README.md`](./elaris-de-elite-mobile/mobileApp/README.md)

---

## Cómo ejecutar el proyecto completo

Se necesitan varias terminales simultáneas (backend, cliente, admin y, opcionalmente, la app móvil):

```bash
# 1. Backend — http://localhost:3000
cd backend
npm install
# crear backend/.env a partir de backend/.env.example
node index.js

# 2. Tienda para clientes — http://localhost:5173
cd elaris-de-elite-client
npm install
npm run dev

# 3. Panel de administración — http://localhost:5174
cd elaris-de-elite-admin
npm install
npm run dev

# 4. App móvil (Expo)
cd elaris-de-elite-mobile/mobileApp
npm install
npm start
```

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend (cliente y admin) | React 19 + Vite |
| App móvil | React Native + Expo |
| Estilos | Tailwind CSS |
| Enrutamiento | React Router DOM |
| Iconos | lucide-react, react-icons |
| Notificaciones / alertas | SweetAlert2 |
| Gráficos | Recharts |
| Backend | Node.js + Express |
| Base de datos | MongoDB + Mongoose |
| Autenticación | JWT en cookies httpOnly (sesiones separadas para cliente y administrador) |
| Almacenamiento de imágenes | Cloudinary |
| Envío de correos | Nodemailer (confirmación de cuenta y recuperación de contraseña) |

---

## Funcionalidades principales

**Tienda pública (cliente):**
- Catálogo de productos con filtros y búsqueda.
- Registro con confirmación de cuenta por correo electrónico.
- Inicio de sesión y recuperación de contraseña por correo.
- Carrito de compras persistente, con aplicación de códigos de descuento.
- Checkout (dirección de envío, pago simulado, confirmación de orden).
- Historial de pedidos y su estado.
- Reseñas de productos, restringidas a productos ya comprados.
- Rutas privadas (carrito y perfil) protegidas según sesión.

**Panel de administración:**
- Gestión (crear, editar, eliminar, visualizar) de productos, categorías, marcas, clientes, pedidos, códigos de descuento, campañas de marketing y administradores.
- Dashboard con estadísticas y gráficos.
- Acceso restringido: todas las secciones, salvo el login, requieren una sesión de administrador activa (protegida tanto en frontend como en el backend).

**App móvil (cliente):**
- Mismas funcionalidades de catálogo, autenticación, carrito y perfil que la tienda web, adaptadas a React Native + Expo.
- Checkout con pago con tarjeta a través de la integración de pruebas (sandbox) de Wompi El Salvador, en vez del pago simulado de la tienda web.
- Ver [`elaris-de-elite-mobile/mobileApp/README.md`](./elaris-de-elite-mobile/mobileApp/README.md) para el detalle completo.

---

## Miembros del equipo

- **Mario Iván Vásquez Cruz**
  Código: 20210050
  Usuario: MarioIvan44, Joshua-Alfredo-Flores-Deleon
  _Nota: realizó contribuciones a la rama principal desde diferentes computadoras con distintos usuarios de GitHub._

- **Julio Josué Pérez Rodríguez**
  Código: 20210261
  Usuario: Julio-Perez32

- **Josué Carlos Ayala Reyes**
  Código: 20240001
  Usuario: Ayala-Carlos

- **Andrea Alejandra Portillo Salegio**
  Código: 20230787
  Usuarios: EduardoCastro29, DouHorvst, Davisito1, Andrea-Salegio
  _Nota: realizó contribuciones a la rama principal desde diferentes computadoras con distintos usuarios de GitHub._
