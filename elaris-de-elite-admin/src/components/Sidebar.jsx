import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Ventas", path: "/ventas" },
  { name: "Clientes", path: "/clientes" },
  { name: "Productos", path: "/productos" },
  { name: "Reseñas", path: "/reviews" },
  { name: "Pedidos", path: "/pedidos"},
  {name: "Campañas de marketing", path: "/marketing"},
  { name: "Códigos de descuentos", path: "/descuentos"}
];

export default function Sidebar() {
  const location = useLocation(); // Esto detecta en qué URL estás automáticamente

  return (
    <div className="w-72 min-h-[85vh] bg-white rounded-2xl flex flex-col justify-between py-6 px-4 mr-4 border border-[#ede8e0]">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
              location.pathname === item.path
                ? "bg-[#c8a87a] text-white shadow-sm"
                : "text-[#3b2a2a] hover:bg-[#f5f0eb]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="px-4">
        <p className="text-[#c8a87a] font-bold text-sm" style={{ fontFamily: "serif" }}>
          Administrador
        </p>
        <p className="text-[#c8a87a] text-xs mt-0.5">josueadmin@elite.com</p>
      </div>
    </div>
  );
}