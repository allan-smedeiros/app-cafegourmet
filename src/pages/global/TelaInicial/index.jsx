import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Button } from "../../../components/Button";

import "./index.css";

export function TelaInicial() {
  const navigate = useNavigate();

  function redirecionarLoginCliente() {
    navigate("login-cliente");
  }

  function redirecionarLoginFuncionario() {
    navigate("login-funcionario");
  }

  return (
    <div className="tela-inicial__conteudo">
      <img className="logo" src={logo} alt="Logo Gourmet Coffee Shop" />

      <div className="card">
        <Button
          style={{ width: "220px" }}
          onClick={redirecionarLoginFuncionario}
        >
          Entrar como Funcionário
        </Button>
      </div>

      <div className="card">
        <Button style={{ width: "220px" }} onClick={redirecionarLoginCliente}>
          Entrar como Cliente
        </Button>
      </div>
    </div>
  );
}
