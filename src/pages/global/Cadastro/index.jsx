import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../../assets/logo.png";

import { Button } from "../../../components/Button";

import "./index.css";
import { apiCadastrarCliente } from "../../../services/requests";

export function Cadastro() {
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      nome: "",
      nascimento: "",
      email: "",
      senha: "",
      cpf: "",
      cep: "",
      cidade: "",
      bairro: "",
      uf: "",
      endereco: "",
      num_endereco: "",
      complemento: "",
    },
  });

  async function cadastrar(dados) {
    for (const key of Object.keys(dados)) {
      if (key !== "complemento") {
        if (!dados[key]) {
          console.log(key);
          toast.warn("Preencha todos os campos obrigatórios (*)");
          return;
        }
      }
    }

    try {
      await apiCadastrarCliente(dados);
      toast.success("Cadastro realizado com sucesso!");

      navigate("/login-cliente");
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  return (
    <div className="tela-cadastro__conteudo">
      <img className="logo" src={logo} alt="Logo Gourmet Coffee Shop" />

      <h1>Cadastro de Cliente</h1>

      <form method="POST" onSubmit={handleSubmit(cadastrar)}>
        <fieldset>
          <label htmlFor="nome">Nome*</label>
          <input
            id="nome"
            style={{ width: "220px" }}
            type="text"
            {...register("nome")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nascimento">Data de Nascimento*</label>
          <input
            id="nascimento"
            style={{ width: "220px" }}
            type="date"
            {...register("nascimento")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">E-mail*</label>
          <input
            id="email"
            style={{ width: "220px" }}
            type="email"
            {...register("email")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="senha">Senha*</label>
          <input
            id="senha"
            style={{ width: "220px" }}
            type="password"
            {...register("senha")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cpf">CPF*</label>
          <input
            id="cpf"
            style={{ width: "220px" }}
            type="text"
            {...register("cpf")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cep">CEP*</label>
          <input
            id="cep"
            style={{ width: "220px" }}
            type="text"
            {...register("cep")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cidade">Cidade*</label>
          <input
            id="cidade"
            style={{ width: "220px" }}
            type="text"
            {...register("cidade")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="bairro">Bairro*</label>
          <input
            id="bairro"
            style={{ width: "220px" }}
            type="text"
            {...register("bairro")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="uf">UF*</label>
          <input
            id="uf"
            style={{ width: "220px" }}
            type="text"
            {...register("uf")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="endereco">Endereço*</label>
          <input
            id="endereco"
            style={{ width: "220px" }}
            type="text"
            {...register("endereco")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="num_endereco">Núm. Endereço*</label>
          <input
            id="num_endereco"
            style={{ width: "220px" }}
            type="text"
            {...register("num_endereco")}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="complemento">Complemento</label>
          <input
            id="complemento"
            style={{ width: "220px" }}
            type="text"
            {...register("complemento")}
          />
        </fieldset>

        <Button style={{ width: "220px", marginTop: "25px" }} type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/">Voltar</Link>
    </div>
  );
}
