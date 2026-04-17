import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bienvenida from "./pages/Bienvenida.jsx";
 
function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Bienvenida" replace />} />
          <Route path="/Bienvenida" element={<Bienvenida/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
 
export default App