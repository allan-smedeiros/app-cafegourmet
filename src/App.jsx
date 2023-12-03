import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { router } from "./routes";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { CarrinhoProvider } from "./context/ContextCarrinho";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
