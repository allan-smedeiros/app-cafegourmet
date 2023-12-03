import Toggle from "react-toggle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../Button";
import "./index.css";
import { useState } from "react";
import { apiAtualizarProduto } from "../../services/requests";

export function ProdutoFuncionario({
  nome,
  valor,
  imagem,
  ingredientes,
  dadosDoProdutoCompletos,
}) {
  const navigate = useNavigate();

  const [habilitar, setHabilitar] = useState(
    dadosDoProdutoCompletos.mostrar_vitrine
  );

  async function atualizarHabilitar() {
    try {
      await apiAtualizarProduto(dadosDoProdutoCompletos.id, {
        mostrar_vitrine: !habilitar,
      });
      toast.success("Sucesso!");
      setHabilitar(!habilitar);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.erro);
    }
  }

  return (
    <div className="produto-funcionario__container">
      <div className="produto-funcionario__esquerda">
        <img
          className="produto-funcionario__foto"
          src={import.meta.env.VITE_API_URL + "/uploads/" + imagem}
          alt=""
        />
        <Button
          onClick={() =>
            navigate("/adm/cadastro-produto/" + dadosDoProdutoCompletos.id)
          }
        >
          Editar Informações
        </Button>
      </div>
      <div className="produto-funcionario__direita">
        <h2>{nome}</h2>
        <span className="produto-funcionario__descricao">{ingredientes}</span>
        <div>
          {Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className="produto-funcionario__toggle">
          <Toggle checked={habilitar} onChange={atualizarHabilitar} />
          <label>Habilitar na vitrine</label>
        </div>
      </div>
    </div>
  );
}
