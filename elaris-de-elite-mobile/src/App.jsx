import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bienvenida from "./pages/Bienvenida.jsx";
import IniciarSesion from "./pages/Login.jsx";
import Registro from "./pages/Registrarse.jsx";
import Inicio from "./pages/Inicio.jsx"; 
import Perfil from "./pages/Perfil.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import CategoriaProductos from "./pages/CategoriaProductos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import CarritoCompras from "./pages/CarritoCompras.jsx";
import TerminosCondiciones from "./pages/TerminosCondiciones.jsx";
 
function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Bienvenida" replace />} />
          <Route path="/Bienvenida" element={<Bienvenida/>} />
          <Route path="/Login" element={<IniciarSesion/>} />
          <Route path="/Registro" element={<Registro/>} />
          <Route path="/Inicio" element={<Inicio/>} />
          <Route path="/categoria/:categoriaId" element={<CategoriaProductos/>} />
          <Route path="/producto/:productoId" element={<DetalleProducto/>} />
          <Route path="/carrito" element={<CarritoCompras/>} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones/>} />
          <Route path="/Pedidos" element={<Pedidos/>} />
          <Route path="/Perfil" element={<Perfil/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
 
export default App