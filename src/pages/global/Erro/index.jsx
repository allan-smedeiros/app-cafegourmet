import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Button } from "../../../components/Button";

import "./index.css";

export function PaginaErro() {
  const navigate = useNavigate();

  function redirecionarInicio() {
    navigate("/");
  }

  return (
    <div className="tela-erro__conteudo">
      <img className="logo" src={logo} alt="Logo Gourmet Coffee Shop" />

      <p>Ops! Ocorreu um erro. Por favor, nos desculpe 😢</p>
      <Button onClick={redirecionarInicio}>Ir para o início</Button>
    </div>
  );
}
