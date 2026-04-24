import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Bienvenida from "./pages/Bienvenida";
import PerfilUsuario from "./pages/PerfilUsuario";
import Carrito from "./pages/Carrito.jsx";
import Productos from "./pages/Productos.jsx"; 
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Novedades from "./pages/Novedades.jsx";
import Resenias from "./pages/Reseñas.jsx";
import Contacto from "./pages/Contacto.jsx";
import TerminosCondiciones from "./pages/TerminosCondiciones.jsx";
import Nosotros from "./pages/Nosotros.jsx";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bienvenida" element={<Bienvenida/>} />
          <Route path="/perfilusuario" element={<PerfilUsuario/>}></Route>
          <Route path="/carrito" element={<Carrito/>}></Route>
          <Route path="/productos" element={<Productos/>}></Route>
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/novedades" element={<Novedades/>}></Route>
          <Route path="/reseñas" element={<Resenias/>}></Route>
          <Route path="/contactanos" element={<Contacto/>}></Route>
          <Route path="/terminosycondiciones" element={<TerminosCondiciones/>}></Route>
          <Route path="/nosotros" element={<Nosotros/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
