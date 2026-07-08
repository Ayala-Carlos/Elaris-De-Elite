import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Ventas from "./pages/Ventas";
import Reviews from "./pages/Reviews";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import CampanasMarketing from "./pages/Marketing";
import AgregarProducto from "./pages/AgregarProducto";
import CategoriasYMarcas from "./pages/CategoriasYMarcas";
import AgregarCampana from "./pages/CampanasMarketingAgregar";
import CodigosDescuento from "./pages/CodigosDescuentos";
import AgregarDescuento from "./pages/AgregarCodigo";
import Administradores from "./pages/Administradores";
import AgregarAdministrador from "./pages/AgregarAdministrador";
import RutaPrivada from "./components/RutaPrivada.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
        <Route path="/clientes" element={<RutaPrivada><Clientes /></RutaPrivada>} />
        <Route path="/ventas" element={<RutaPrivada><Ventas /></RutaPrivada>} />
        <Route path="/reviews" element={<RutaPrivada><Reviews /></RutaPrivada>} />
        <Route path="/productos" element={<RutaPrivada><Productos /></RutaPrivada>} />
        <Route path="/pedidos" element={<RutaPrivada><Pedidos /></RutaPrivada>} />
        <Route path="/marketing" element={<RutaPrivada><CampanasMarketing /></RutaPrivada>} />
        <Route path="/marketing/agregar" element={<RutaPrivada><AgregarCampana /></RutaPrivada>} />
        <Route path="/marketing/editar/:id" element={<RutaPrivada><AgregarCampana /></RutaPrivada>} />
        <Route path="/productos/agregar" element={<RutaPrivada><AgregarProducto /></RutaPrivada>} />
        <Route path="/productos/editar/:id" element={<RutaPrivada><AgregarProducto /></RutaPrivada>} />
        <Route path="/descuentos/editar/:id" element={<RutaPrivada><AgregarDescuento /></RutaPrivada>} />
        <Route
          path="/productos/categoriasymarcas"
          element={<RutaPrivada><CategoriasYMarcas /></RutaPrivada>}
        />
        <Route path="/descuentos" element={<RutaPrivada><CodigosDescuento /></RutaPrivada>} />
        <Route path="/descuentos/agregar" element={<RutaPrivada><AgregarDescuento /></RutaPrivada>} />
        <Route path="/administradores" element={<RutaPrivada><Administradores /></RutaPrivada>} />
        <Route path="/administradores/agregar" element={<RutaPrivada><AgregarAdministrador /></RutaPrivada>} />
      </Routes>
    </BrowserRouter>
  );
}
