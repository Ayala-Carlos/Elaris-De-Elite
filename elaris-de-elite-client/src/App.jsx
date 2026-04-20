import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Bienvenida from "./pages/Bienvenida";
import PerfilUsuario from "./pages/PerfilUsuario";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bienvenida" element={<Bienvenida/>} />
          <Route path="/perfilusuario" element={<PerfilUsuario/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
