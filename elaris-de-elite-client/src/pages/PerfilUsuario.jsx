import { useState } from "react";
import {
    User, Package, Heart, Settings, LogOut, MapPin, Phone,
    Mail, Edit2, Star, ChevronRight, Check, ShoppingBag,
    Search, X, Plus, Trash2
} from "lucide-react";
import NavBar from "../components/BarraNavegacion.jsx"
import Footer from "../components/Footer.jsx";


// ─── COLORES DE MARCA ─────────────────────────────────────────────────────────
const C = {
    rojo: "#DE4B52",
    dorado: "#D4A574",
    marron: "#6B5B4E",
    fondo: "#FAF8F5",
    rosa: "#E8949B",
    crema: "#F2E7E1",
};

// ─── DATOS MOCK ───────────────────────────────────────────────────────────────
const usuario = {
    nombre: "María Fernández",
    email: "maria.fernandez@gmail.com",
    telefono: "+503 7890-1234",
    direccion: "Col. Escalón, San Salvador",
    miembro: "Miembro Gold",
    desde: "Enero 2023",
    iniciales: "MF",
    pedidos: 12,
    puntos: 850,
};

// ─── TAB: MI PERFIL ───────────────────────────────────────────────────────────
const TabPerfil = () => {
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
    });

    const Campo = ({ label, fieldKey, icon }) => (
        <div style={{ marginBottom: 16 }}>
            <label style={{
                fontSize: 12, color: C.marron, fontWeight: 600,
                display: "block", marginBottom: 5,
            }}>
                {label}
            </label>
            <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                    {icon}
                </span>
                <input
                    value={form[fieldKey]}
                    disabled={!editando}
                    onChange={e => setForm({ ...form, [fieldKey]: e.target.value })}
                    style={{
                        width: "100%",
                        padding: "10px 12px 10px 36px",
                        border: `1.5px solid ${editando ? C.dorado : "#E8D5CA"}`,
                        borderRadius: 8,
                        fontSize: 13,
                        color: C.marron,
                        background: editando ? "#fff" : C.fondo,
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s",
                    }}
                />
            </div>
        </div>
    );

    return (
        <div>
            {/* Encabezado + botón editar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.marron, margin: 0 }}>
                    Información personal
                </h3>
                <button
                    onClick={() => setEditando(!editando)}
                    style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: editando ? C.dorado : "transparent",
                        color: editando ? "#fff" : C.dorado,
                        border: `1.5px solid ${C.dorado}`,
                        padding: "7px 16px", borderRadius: 8,
                        fontSize: 13, cursor: "pointer", fontWeight: 600,
                        transition: "all 0.2s",
                    }}
                >
                    {editando ? <><Check size={14} /> Guardar</> : <><Edit2 size={14} /> Editar</>}
                </button>
            </div>

            {/* Campos en grid 2 columnas */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                <Campo label="Nombre completo" fieldKey="nombre" icon={<User size={14} color={C.dorado} />} />
                <Campo label="Correo electrónico" fieldKey="email" icon={<Mail size={14} color={C.dorado} />} />
                <Campo label="Teléfono" fieldKey="telefono" icon={<Phone size={14} color={C.dorado} />} />
                <Campo label="Dirección" fieldKey="direccion" icon={<MapPin size={14} color={C.dorado} />} />
            </div>

            {/* Cambiar contraseña */}
            <div style={{
                marginTop: 24, padding: "16px 20px",
                background: C.crema, borderRadius: 10,
                border: "1px solid #E8D5CA",
            }}>
                <p style={{ fontSize: 12, color: C.marron, fontWeight: 600, margin: "0 0 6px" }}>
                    Cambiar contraseña
                </p>
                <p style={{ fontSize: 12, color: "#9c8880", margin: 0 }}>
                    Para cambiar tu contraseña, enviaremos un enlace de confirmación a tu correo registrado.
                </p>
                <button style={{
                    marginTop: 10, background: "transparent",
                    border: `1.5px solid ${C.rojo}`, color: C.rojo,
                    padding: "7px 16px", borderRadius: 8,
                    fontSize: 12, cursor: "pointer", fontWeight: 600,
                }}>
                    Solicitar cambio
                </button>
            </div>
        </div>
    );
};

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function PerfilUsuario() {
    return (
        <div className="bg-[#FAF8F5] min-h-screen flex flex-col">
            <NavBar />

            {/*CONTENIDO */}
            <main className="flex-1">
                {/* HEADER */}
                <div style={{
                    background: `linear-gradient(135deg, ${C.rosa} 0%, #E8A0A8 50%, ${C.dorado} 100%)`,
                    padding: "32px 48px", display: "flex", alignItems: "center", gap: 24, marginTop:10
                }}>
                    {/* Avatar */}
                    <div style={{
                        width: 72, height: 72, borderRadius: "50%", background: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, fontWeight: 700, color: C.rosa, flexShrink: 0,
                        border: "3px solid rgba(255,255,255,0.6)",
                    }}>
                        {usuario.iniciales}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: "0 0 3px", fontSize: 20, fontWeight: 700, color: "#fff" }}>
                            {usuario.nombre}
                        </h2>
                        <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                            {usuario.email} · Miembro desde {usuario.desde}
                        </p>
                        <span style={{
                            background: "rgba(255,255,255,0.25)", color: "#fff",
                            fontSize: 11, fontWeight: 700, padding: "3px 12px",
                            borderRadius: 20, letterSpacing: 0.5,
                        }}>
                            ✦ {usuario.miembro}
                        </span>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: 16 }}>
                        {[{ val: usuario.pedidos, label: "Pedidos" }, { val: usuario.puntos, label: "Puntos" }].map(({ val, label }) => (
                            <div key={label} style={{
                                textAlign: "center", background: "rgba(255,255,255,0.2)",
                                padding: "12px 22px", borderRadius: 10,
                            }}>
                                <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff" }}>{val}</p>
                                <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.85)" }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LAYOUT */}
                <div style={{
                    display: "grid", gridTemplateColumns: "220px 1fr",
                    gap: 24, padding: "28px 48px",
                    maxWidth: 1100, margin: "0 auto",
                }}>
                    {/* SIDEBAR */}
                    <div>
                        <div style={{
                            background: "#fff", borderRadius: 12,
                            border: "1px solid #E8D5CA", overflow: "hidden", marginBottom: 14,
                        }}>
                            {/* Tab único activo */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "13px 18px",
                                background: C.crema,
                                borderLeft: `3px solid ${C.dorado}`,
                            }}>
                                <User size={16} color={C.dorado} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: C.marron }}>Mi perfil</span>
                            </div>
                        </div>

                        <button style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10,
                            padding: "11px 18px", border: "1px solid #F5D6D8",
                            borderRadius: 10, background: "#fff",
                            color: C.rojo, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        }}>
                            <LogOut size={15} /> Cerrar sesión
                        </button>
                    </div>

                    {/* CONTENIDO */}
                    <div style={{
                        background: "#fff", borderRadius: 12,
                        border: "1px solid #E8D5CA",
                        padding: "24px 28px", minHeight: 400,
                    }}>
                        <TabPerfil />
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
        
    );
}