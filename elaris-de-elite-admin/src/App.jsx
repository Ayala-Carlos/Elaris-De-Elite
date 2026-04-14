import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";  
import Clientes from "./pages/Clientes";
import Ventas from "./pages/Ventas";
import Reviews from "./pages/Reviews"
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import CampanasMarketing from "./pages/Marketing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/ventas" element={<Ventas/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/pedidos" element={<Pedidos/>} />
        <Route path="/marketing" element={<CampanasMarketing/>} />

      </Routes>
    </BrowserRouter>
  );
}