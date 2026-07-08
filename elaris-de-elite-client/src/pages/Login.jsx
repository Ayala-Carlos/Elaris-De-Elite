import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from "../img/LogoElarisElite.png";
import Input from '../components/CajaTexto.jsx';
import Boton from '../components/Boton.jsx';
import { useAuth } from '../hooks/useAuth.js';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, verifyRegisterCode, requestPasswordRecovery, verifyRecoveryCode, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [vista, setVista] = useState('login');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const [registerData, setRegisterData] = useState({
    nombre: "", email: "", password: "", telefono: "",
    direccion: "", pais: "", estado: "", ciudad: ""
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerError, setRegisterError] = useState('');

  const [registerCode, setRegisterCode] = useState('');
  const [registerCodeError, setRegisterCodeError] = useState('');

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState('');

  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveryCodeError, setRecoveryCodeError] = useState('');

  const [resetData, setResetData] = useState({ password: "", confirmar: "" });
  const [resetError, setResetError] = useState('');

  // Sincroniza la tab con la vista
  const cambiarTab = (tab) => {
    setActiveTab(tab);
    setVista(tab);
    setNotice('');
  };

  const volverAlLogin = () => {
    setVista('login');
    setActiveTab('login');
    setNotice('');
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefono = (telefono) => /^\d{10}$/.test(telefono);

  const validateLogin = () => {
    const errs = {};
    if (!loginData.email.trim()) errs.email = 'El correo es requerido';
    else if (!validarEmail(loginData.email.trim())) errs.email = 'Ingresa un correo válido';
    if (!loginData.password) errs.password = 'La contraseña es requerida';
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateRegister = () => {
    const errs = {};
    const nombre = registerData.nombre.trim();
    if (!nombre) errs.nombre = 'El nombre es requerido';
    else if (nombre.length < 3 || nombre.length > 15) errs.nombre = 'Debe tener entre 3 y 15 caracteres';

    if (!registerData.email.trim()) errs.email = 'El correo es requerido';
    else if (!validarEmail(registerData.email.trim())) errs.email = 'Ingresa un correo válido';

    if (!registerData.password) errs.password = 'La contraseña es requerida';
    else if (registerData.password.length < 6 || registerData.password.length > 20) errs.password = 'Debe tener entre 6 y 20 caracteres';

    if (registerData.telefono.trim() && !validarTelefono(registerData.telefono.trim())) {
      errs.telefono = 'Debe tener 10 dígitos';
    }

    setRegisterErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!validateLogin()) return;
    setSubmitting(true);
    try {
      await login(loginData.email.trim(), loginData.password);
      navigate('/bienvenida');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    if (!validateRegister()) return;
    setSubmitting(true);
    try {
      await register({
        name: registerData.nombre.trim(),
        email: registerData.email.trim(),
        phoneNumber: registerData.telefono.trim(),
        password: registerData.password,
        accountStatus: "active",
        isActive: true,
        loyaltyPoints: 0,
        loginAttempts: 0,
        timeOut: null,
      });
      setVista('registerCode');
    } catch (err) {
      setRegisterError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterCodeSubmit = async (e) => {
    e.preventDefault();
    setRegisterCodeError('');

    if (registerCode.trim().length !== 6) {
      setRegisterCodeError('El código debe tener 6 caracteres');
      return;
    }

    setSubmitting(true);
    try {
      await verifyRegisterCode(registerCode.trim());
      setRegisterCode('');
      setNotice('Cuenta verificada. Ya puedes iniciar sesión.');
      cambiarTab('login');
    } catch (err) {
      setRegisterCodeError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      setForgotError('El correo es requerido');
      return;
    }

    if (!validarEmail(forgotEmail.trim())) {
      setForgotError('Ingresa un correo válido.');
      return;
    }

    setForgotError('');
    setSubmitting(true);
    try {
      await requestPasswordRecovery(forgotEmail.trim());
      setVista('recoveryCode');
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecoveryCodeSubmit = async (e) => {
    e.preventDefault();
    setRecoveryCodeError('');

    if (recoveryCode.trim().length !== 6) {
      setRecoveryCodeError('El código debe tener 6 caracteres');
      return;
    }

    setSubmitting(true);
    try {
      await verifyRecoveryCode(recoveryCode.trim());
      setVista('reset');
    } catch (err) {
      setRecoveryCodeError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!resetData.password || !resetData.confirmar) {
      setResetError('Completa ambos campos de contraseña.');
      return;
    }

    if (resetData.password.length < 6 || resetData.password.length > 20) {
      setResetError('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }

    if (resetData.password !== resetData.confirmar) {
      setResetError('Las contraseñas no coinciden.');
      return;
    }

    setResetError('');
    setSubmitting(true);
    try {
      await resetPassword(resetData.password, resetData.confirmar);
      setResetData({ password: '', confirmar: '' });
      setRecoveryCode('');
      setForgotEmail('');
      setNotice('Contraseña restablecida con éxito. Ya puedes iniciar sesión.');
      cambiarTab('login');
    } catch (err) {
      setResetError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Títulos / subtítulos dinámicos ── */
  const titulo = {
    login: 'Iniciar sesión',
    register: 'Registrarse',
    registerCode: 'Verifica tu correo',
    forgot: '¿Olvidaste tu contraseña?',
    recoveryCode: 'Verifica el código',
    reset: 'Restablecer contraseña',
  }[vista];

  const subtitulo = {
    login: 'Accede a tu cuenta para continuar',
    register: 'Crea tu cuenta para continuar',
    registerCode: 'Ingresa el código de 6 caracteres que enviamos a tu correo',
    forgot: 'Ingresa tu correo y te enviaremos las instrucciones a tu correo',
    recoveryCode: 'Ingresa el código que enviamos a tu correo',
    reset: 'Ingresa tu nueva contraseña',
  }[vista];

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-stretch">

        {/* PANEL IZQUIERDO */}
        <div className="w-full md:w-1/2 bg-[#f3e9dc] p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-sm">
          <div className="mb-8">
            <img src={logoImg} alt="Logo Elaris de Elite" className="w-72 h-auto object-contain drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-bold text-[#5c4d42] mb-4">Bienvenido a tu belleza</h2>
          <p className="text-[#8d7a66] text-sm leading-relaxed mb-10 max-w-xs">
            Descubre productos de lujo que realzan tu belleza natural. Únete a nuestra comunidad exclusiva.
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9e8f83]"></div>
            <div className="w-12 h-12 rounded-full bg-[#d4ac80]"></div>
            <div className="w-12 h-12 rounded-full bg-[#eea0a0]"></div>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="w-full md:w-1/2 p-12 bg-white rounded-[2.5rem] flex flex-col justify-center shadow-lg border border-gray-100">
          <div className="max-w-sm mx-auto w-full">

            {/* Botón volver (solo en forgot / recoveryCode / reset / registerCode) */}
            {(vista === 'forgot' || vista === 'recoveryCode' || vista === 'reset' || vista === 'registerCode') && (
              <button
                onClick={
                  vista === 'reset' ? () => setVista('recoveryCode') :
                  vista === 'recoveryCode' ? () => setVista('forgot') :
                  volverAlLogin
                }
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#5c4d42] transition-colors mb-6 group"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
              </button>
            )}

            <h1 className="text-2xl font-bold text-[#5c4d42] text-center mb-1">{titulo}</h1>
            <p className="text-gray-400 text-xs text-center mb-8 leading-relaxed">{subtitulo}</p>

            {notice && (
              <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center mb-6">{notice}</p>
            )}

            {/* Selector de Tab (solo login / register) */}
            {(vista === 'login' || vista === 'register') && (
              <div className="flex bg-[#f3e9dc]/50 p-1 rounded-xl mb-8">
                <button
                  onClick={() => cambiarTab('login')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'login' ? 'bg-white text-[#5c4d42] shadow-sm' : 'text-gray-500 hover:text-[#5c4d42]'}`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => cambiarTab('register')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'register' ? 'bg-white text-[#5c4d42] shadow-sm' : 'text-gray-500 hover:text-[#5c4d42]'}`}
                >
                  Registrarse
                </button>
              </div>
            )}

            {/* ── FORMULARIO LOGIN ── */}
            {vista === 'login' && (
              <form className="space-y-6" onSubmit={handleLoginSubmit} noValidate>
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={loginData.email}
                  error={loginErrors.email}
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                    if (loginErrors.email) setLoginErrors({ ...loginErrors, email: null });
                  }}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  value={loginData.password}
                  error={loginErrors.password}
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                    if (loginErrors.password) setLoginErrors({ ...loginErrors, password: null });
                  }}
                />
                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center text-gray-400 cursor-pointer select-none">
                    <input type="checkbox" className="mr-2" />
                    Recordarme
                  </label>
                  <button
                    type="button"
                    onClick={() => setVista('forgot')}
                    className="text-[#5c4d42] font-semibold hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                {loginError && <p className="text-xs text-red-500 -mt-3">{loginError}</p>}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Iniciar sesión
                </Boton>
              </form>
            )}

            {/* ── FORMULARIO REGISTRO ── */}
            {vista === 'register' && (
              <form className="space-y-6" onSubmit={handleRegisterSubmit} noValidate>
                <Input
                  label="Nombre completo"
                  value={registerData.nombre}
                  error={registerErrors.nombre}
                  onChange={(e) => {
                    setRegisterData({ ...registerData, nombre: e.target.value });
                    if (registerErrors.nombre) setRegisterErrors({ ...registerErrors, nombre: null });
                  }}
                />
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={registerData.email}
                  error={registerErrors.email}
                  onChange={(e) => {
                    setRegisterData({ ...registerData, email: e.target.value });
                    if (registerErrors.email) setRegisterErrors({ ...registerErrors, email: null });
                  }}
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      label="Contraseña"
                      type="password"
                      value={registerData.password}
                      error={registerErrors.password}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, password: e.target.value });
                        if (registerErrors.password) setRegisterErrors({ ...registerErrors, password: null });
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Teléfono"
                      value={registerData.telefono}
                      error={registerErrors.telefono}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, telefono: e.target.value });
                        if (registerErrors.telefono) setRegisterErrors({ ...registerErrors, telefono: null });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input label="País" value={registerData.pais} onChange={(e) => setRegisterData({ ...registerData, pais: e.target.value })} />
                  <Input label="Estado" value={registerData.estado} onChange={(e) => setRegisterData({ ...registerData, estado: e.target.value })} />
                  <Input label="Ciudad" value={registerData.ciudad} onChange={(e) => setRegisterData({ ...registerData, ciudad: e.target.value })} />
                </div>
                <Input
                  label="Dirección"
                  value={registerData.direccion}
                  onChange={(e) => setRegisterData({ ...registerData, direccion: e.target.value })}
                />
                {registerError && <p className="text-xs text-red-500 -mt-3">{registerError}</p>}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Crear cuenta
                </Boton>
              </form>
            )}

            {/* ── FORMULARIO CÓDIGO DE VERIFICACIÓN DE REGISTRO ── */}
            {vista === 'registerCode' && (
              <form className="space-y-6" onSubmit={handleRegisterCodeSubmit}>
                <Input
                  label="Código de verificación"
                  value={registerCode}
                  onChange={(e) => {
                    setRegisterCode(e.target.value);
                    if (registerCodeError) setRegisterCodeError('');
                  }}
                />
                {registerCodeError && (
                  <p className="text-xs text-red-500 -mt-3">{registerCodeError}</p>
                )}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Verificar cuenta
                </Boton>
              </form>
            )}

            {/* ── FORMULARIO OLVIDÉ CONTRASEÑA ── */}
            {vista === 'forgot' && (
              <form className="space-y-6" onSubmit={handleForgotSubmit} noValidate>
                <Input
                  label="Correo"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    if (forgotError) setForgotError('');
                  }}
                />
                {forgotError && (
                  <p className="text-xs text-red-500 -mt-3">{forgotError}</p>
                )}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Enviar
                </Boton>
              </form>
            )}

            {/* ── FORMULARIO CÓDIGO DE RECUPERACIÓN ── */}
            {vista === 'recoveryCode' && (
              <form className="space-y-6" onSubmit={handleRecoveryCodeSubmit}>
                <Input
                  label="Código de recuperación"
                  value={recoveryCode}
                  onChange={(e) => {
                    setRecoveryCode(e.target.value);
                    if (recoveryCodeError) setRecoveryCodeError('');
                  }}
                />
                {recoveryCodeError && (
                  <p className="text-xs text-red-500 -mt-3">{recoveryCodeError}</p>
                )}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Verificar código
                </Boton>
              </form>
            )}

            {/* ── FORMULARIO RESTABLECER CONTRASEÑA ── */}
            {vista === 'reset' && (
              <form className="space-y-6" onSubmit={handleResetSubmit}>
                <Input
                  label="Contraseña"
                  type="password"
                  value={resetData.password}
                  onChange={(e) => {
                    setResetData({ ...resetData, password: e.target.value });
                    if (resetError) setResetError('');
                  }}
                />
                <Input
                  label="Confirmar contraseña"
                  type="password"
                  value={resetData.confirmar}
                  onChange={(e) => {
                    setResetData({ ...resetData, confirmar: e.target.value });
                    if (resetError) setResetError('');
                  }}
                />
                {resetError && (
                  <p className="text-xs text-red-500 -mt-3">{resetError}</p>
                )}
                <Boton tipo="primario" anchoTotal type="submit" disabled={submitting}>
                  Enviar
                </Boton>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
