import React, { useState } from 'react';
import logoImg from "../img/LogoElarisElite.png";
import Input from '../components/CajaTexto.jsx';
import Boton from '../components/Boton.jsx';
import { Link } from "react-router-dom";
const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    pais: "",
    estado: "",
    ciudad: ""
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-6 font-sans">
      {/* Contenedor Principal con GAP para separar los rectángulos */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-stretch">

        {/* PANEL IZQUIERDO (BIENVENIDA) - Rectángulo Independiente */}
        <div className="w-full md:w-1/2 bg-[#f3e9dc] p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-sm">
          {/* Logo */}
          <div className="mb-8">
            <img
              src={logoImg}
              alt="Logo Elaris de Elite"
              className="w-72 h-auto object-contain drop-shadow-sm"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#5c4d42] mb-4">Bienvenido a tu belleza</h2>
          <p className="text-[#8d7a66] text-sm leading-relaxed mb-10 max-w-xs">
            Descubre productos de lujo que realzan tu belleza natural.
            Únete a nuestra comunidad exclusiva.
          </p>

          {/* Círculos de Colores */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9e8f83]"></div>
            <div className="w-12 h-12 rounded-full bg-[#d4ac80]"></div>
            <div className="w-12 h-12 rounded-full bg-[#eea0a0]"></div>
          </div>
        </div>

        {/* PANEL DERECHO (FORMULARIO) - Rectángulo Independiente */}
        <div className="w-full md:w-1/2 p-12 bg-white rounded-[2.5rem] flex flex-col justify-center shadow-lg border border-gray-100">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-2xl font-bold text-[#5c4d42] text-center mb-1">
              {activeTab === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </h1>
            <p className="text-gray-400 text-xs text-center mb-8">
              {activeTab === 'login'
                ? 'Accede a tu cuenta para continuar'
                : 'Crea tu cuenta para continuar'}
            </p>

            {/* Selector de Tab */}
            <div className="flex bg-[#f3e9dc]/50 p-1 rounded-xl mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'login' ? 'bg-white text-[#5c4d42] shadow-sm' : 'text-gray-500 hover:text-[#5c4d42]'}`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'register' ? 'bg-white text-[#5c4d42] shadow-sm' : 'text-gray-500 hover:text-[#5c4d42]'}`}
              >
                Registrarse
              </button>
            </div>

            {/* Formulario */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

              {activeTab === 'login' ? (
                <>
                  <Input
                    label="Correo electrónico"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />

                  <Input
                    label="Contraseña"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />

                  <div className="flex items-center justify-between text-[11px]">
                    <label className="flex items-center text-gray-400 cursor-pointer select-none">
                      <input type="checkbox" className="mr-2" />
                      Recordarme
                    </label>
                    <a href="#" className="text-[#5c4d42] font-semibold hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Boton tipo="primario" anchoTotal>
                    <Link to="/bienvenida">
                      Iniciar sesión
                    </Link>
                  </Boton>
                </>
              ) : (
                <>
                  <Input
                    label="Nombre completo"
                    value={registerData.nombre}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, nombre: e.target.value })
                    }
                  />

                  <Input
                    label="Correo electrónico"
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        label="Contraseña"
                        type="password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <Input
                        label="Teléfono"
                        value={registerData.telefono}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, telefono: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Input
                      label="País"
                      value={registerData.pais}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, pais: e.target.value })
                      }
                    />

                    <Input
                      label="Estado"
                      value={registerData.estado}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, estado: e.target.value })
                      }
                    />

                    <Input
                      label="Ciudad"
                      value={registerData.ciudad}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, ciudad: e.target.value })
                      }
                    />
                  </div>
                   <Input
                    label="Dirección"
                    value={registerData.direccion}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, direccion: e.target.value })
                    }
                  />
                  <Boton tipo="primario" anchoTotal>
                    <Link to="/bienvenida">
                      Crear cuenta
                    </Link>
                  </Boton>
                </>
              )}

            </form>

            {/* Volver al inicio */}
            <button className="w-full mt-8 flex items-center justify-center text-xs text-gray-400 hover:text-[#5c4d42] transition-colors group">
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;