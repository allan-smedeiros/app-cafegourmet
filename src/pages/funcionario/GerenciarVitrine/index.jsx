import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { UilApps } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";
import { ProdutoFuncionario } from "../../../components/ProdutoFuncionario";
import { TemplateFuncionario } from "../../template/TemplateFuncionario";

import "./index.css";
import { apiListarProdutos } from "../../../services/requests";
import { useAuth } from "../../../context/AuthContext";

export function GerenciarVitrine() {
  const navigate = useNavigate();
  const { verificarLogin } = useAuth();

  const [produtos, setProdutos] = useState([]);

  async function listarProdutos() {
    try {
      const res = await apiListarProdutos();
      setProdutos(res.data.produtos);
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function iniciar() {
    await verificarLogin("Funcionário");
    listarProdutos();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateFuncionario>
      <Titulo>
        <UilApps />
        Gerenciar Vitrine
      </Titulo>

      <div className="carrinho__botao-container">
        <Button onClick={() => navigate("/adm/cadastro-produto")}>
          Novo Produto
        </Button>
      </div>

      <div className="vitrine__produtos-grid">
        {produtos.map((produto) => (
          <ProdutoFuncionario
            key={produto.id}
            {...produto}
            dadosDoProdutoCompletos={produto}
          />
        ))}
      </div>
    </TemplateFuncionario>
  );
}
