/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.token);
      localStorage.setItem("CAFE_TIPO_USUARIO", action.tipo_usuario);

      const token = jwtDecode(action.token);

      if (action.tipo_usuario === "Cliente") {
        localStorage.setItem("CAFE_ENDERECO_CLIENTE", token.endereco);
        localStorage.setItem("CAFE_ID_CLIENTE", token.userId);
      }
      return { ...state, token: action.token, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("CAFE_TIPO_USUARIO");
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const initialState = {
    token: storedToken,
    isAuthenticated: Boolean(storedToken),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const verificarTokenExpirado = (token) => {
    try {
      let tokenDecoded = jwtDecode(token);

      return Date.now() <= tokenDecoded.exp * 1000;
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      return false;
    }
  };

  const verificarLogin = async (tipo_usuario) => {
    const token = localStorage.getItem("token");
    const usuarioTipo = localStorage.getItem("CAFE_TIPO_USUARIO");

    if (token) {
      const tokenValido = verificarTokenExpirado(token);
      const usuarioValido = tipo_usuario === usuarioTipo;

      if (!tokenValido || !usuarioValido) {
        dispatch({ type: "LOGOUT" });
        window.location.href = "/";
      }
    } else {
      dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        dispatch,
        verificarTokenExpirado,
        verificarLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }
  return context;
};
