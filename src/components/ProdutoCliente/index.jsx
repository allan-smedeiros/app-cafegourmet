import { toast } from "react-toastify";

import { useCarrinho } from "../../context/ContextCarrinho";
import { Button } from "../Button";
import "./index.css";

export function ProdutoCliente({
  nome,
  valor,
  imagem,
  ingredientes,
  dadosDoProdutoCompletos,
}) {
  const { adicionarItem } = useCarrinho();

  const adicionarProduto = () => {
    adicionarItem(dadosDoProdutoCompletos);
    toast.success("Produto adicionado!");
  };

  return (
    <div className="produto-cliente__container">
      <div className="produto-cliente__esquerda">
        <img
          className="produto-cliente__foto"
          src={import.meta.env.VITE_API_URL + "/uploads/" + imagem}
          alt=""
        />
        <Button onClick={adicionarProduto}>Adicionar ao Carrinho</Button>
      </div>
      <div className="produto-cliente__direita">
        <h2>{nome}</h2>
        <span className="produto-cliente__descricao">{ingredientes}</span>
        <div>
          {Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}
