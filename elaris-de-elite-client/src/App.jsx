import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Bienvenida from "./pages/Bienvenida";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bienvenida" element={<Bienvenida/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
