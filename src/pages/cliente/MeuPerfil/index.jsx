import { useEffect, useState } from "react";
import { UilUser } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";

import { TemplateCliente } from "../../template/TemplateCliente";

import "./index.css";
import {
  apiAtualizarCliente,
  apiListarCliente,
} from "../../../services/requests";
import { useAuth } from "../../../context/AuthContext";

export function MeuPerfil() {
  const [meuPerfil, setMeuPerfil] = useState({});
  const { verificarLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function carregarDados() {
    try {
      const res = await apiListarCliente();
      const meuPerfil = res.data.clientes.find(
        (cliente) => cliente.id === +localStorage.getItem("CAFE_ID_CLIENTE")
      );

      setMeuPerfil(meuPerfil);
      setEmail(meuPerfil.email);
    } catch (err) {
      toast.error(err.response.data.erro || "Ocorreu um erro");
    }
  }

  async function salvar() {
    try {
      await apiAtualizarCliente(meuPerfil.id, { email, senha });
      toast.success("Atualizado com sucesso!");
    } catch (err) {
      toast.error(err.response.data.erro || "Ocorreu um erro");
    }
  }

  async function iniciar() {
    await verificarLogin("Cliente");
    carregarDados();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateCliente>
      <Titulo>
        <UilUser />
        Meu Perfil
      </Titulo>

      <form className="meu-perfil__form">
        <fieldset>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            value={meuPerfil?.nome}
            style={{ width: "60%" }}
            type="text"
            disabled
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nascimento">Dt. Nasc.:</label>
          <input
            id="nascimento"
            style={{ width: "60%" }}
            type="date"
            value={meuPerfil?.data_nascimento}
            disabled
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            style={{ width: "60%" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            style={{ width: "60%" }}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </fieldset>

        <fieldset className="endereco">
          <label>Endereço</label>
          <textarea
            style={{ width: "100%", height: "100px" }}
            disabled
            rows={3}
            value={`${meuPerfil.endereco}, ${meuPerfil.num_endereco} - ${meuPerfil.bairro}, ${meuPerfil.cidade} - ${meuPerfil.uf} - ${meuPerfil.cep}`}
          ></textarea>
        </fieldset>
      </form>

      <p style={{ textAlign: "center" }}>
        * Apenas o e-mail e a senha podem ser editados nesse momento
      </p>

      <div className="meu-perfil__botao-salvar">
        <Button onClick={salvar}>Salvar Alterações</Button>
      </div>
    </TemplateCliente>
  );
}
