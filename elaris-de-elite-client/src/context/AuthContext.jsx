import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService.js";
import { customersService } from "../services/customersService.js";

const STORAGE_KEY = "elaris_client_user";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (customer) => {
    setUser(customer);
    if (customer) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email, password) => {
    await authService.login(email, password);
    const customer = await customersService.searchByEmail(email);
    persistUser(customer);
    return customer;
  };

  const register = (data) => authService.register(data);

  const verifyRegisterCode = (code) => authService.verifyRegisterCode(code);

  const requestPasswordRecovery = (email) => authService.requestRecoveryCode(email);

  const verifyRecoveryCode = (code) => authService.verifyRecoveryCode(code);

  const resetPassword = (newPassword, confirmNewPassword) =>
    authService.resetPassword(newPassword, confirmNewPassword);

  const updateProfile = async (data) => {
    if (!user) throw new Error("No hay sesión activa");

    const payload = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      accountStatus: user.accountStatus,
      isActive: user.isActive,
      loginAttempts: user.loginAttempts,
      timeOut: user.timeOut,
      loyaltyPoints: user.loyaltyPoints,
      ...data,
    };

    await customersService.update(user._id, payload);
    const updated = { ...user, ...payload };
    persistUser(updated);
    return updated;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      persistUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        verifyRegisterCode,
        requestPasswordRecovery,
        verifyRecoveryCode,
        resetPassword,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
