import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../../assets/logo.png";

import { Button } from "../../../components/Button";

import "./index.css";
import {
  apiLoginCliente,
  apiLoginFuncionario,
} from "../../../services/requests";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export function Login({ tipo }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useAuth();

  async function fazerLogin() {
    try {
      const res = await (tipo === "Cliente"
        ? apiLoginCliente({ email, senha })
        : apiLoginFuncionario({ email, senha }));

      dispatch({ type: "LOGIN", token: res.data.token, tipo_usuario: tipo });

      if (tipo === "Cliente") {
        navigate("/cliente/vitrine");
      } else {
        navigate("/adm/pedidos");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.mensagem || err.response.data.erro);
    }
  }

  return (
    <div className="tela-login__conteudo">
      <img className="logo" src={logo} alt="Logo Gourmet Coffee Shop" />

      <h1>Login {tipo} </h1>

      <form>
        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            style={{ width: "220px" }}
            type="email"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            style={{ width: "220px" }}
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
        </fieldset>
      </form>

      <Button style={{ width: "220px" }} onClick={fazerLogin}>
        Entrar
      </Button>

      {tipo !== "Funcionário" && (
        <Link style={{ marginTop: "50px" }} to="/cadastro">
          Cadastre-se
        </Link>
      )}
      <Link to="/">Voltar</Link>
    </div>
  );
}
