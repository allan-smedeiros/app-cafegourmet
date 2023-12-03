import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UilShoppingCart, UilTrash } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { ButtonIcon } from "../../../components/ButtonIcon";
import { Button } from "../../../components/Button";

import { TemplateCliente } from "../../template/TemplateCliente";
import { useCarrinho } from "../../../context/ContextCarrinho";

import "./index.css";
import { useAuth } from "../../../context/AuthContext";

export const ItemCarrinho = ({ item, desabilitarEdicao }) => {
  const [quantidade, setQuantidade] = useState(item.quantidade);
  const { alterarItem, removerItem } = useCarrinho();
  const { verificarLogin } = useAuth();

  function alterarQuantidade(e) {
    const novaQuantidade = e.target.value;
    setQuantidade(novaQuantidade);
    alterarItem({
      ...item,
      quantidade:
        isNaN(+novaQuantidade) || +novaQuantidade === 0 ? 1 : +novaQuantidade,
    });
  }

  async function iniciar() {
    await verificarLogin("Cliente");
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <tr>
      <td>
        {item.nome} ={" "}
        {Number(item.valor).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td className="carrinho__tabela-quantidade">
        <input
          type="number"
          value={quantidade}
          disabled={desabilitarEdicao}
          onChange={alterarQuantidade}
        />
        {!desabilitarEdicao && (
          <ButtonIcon
            style={{ width: "30px", height: "30px" }}
            onClick={() => removerItem(item.id)}
          >
            <UilTrash style={{ width: "15px", height: "15px" }} />
          </ButtonIcon>
        )}
      </td>
    </tr>
  );
};

export function Carrinho() {
  const { carrinho, calcularTotal } = useCarrinho();
  const navigate = useNavigate();

  function confirmarPedido() {
    if (carrinho.length === 0) {
      toast.warn("Insira itens para prosseguir");
      return;
    }

    navigate("/cliente/forma-pagamento");
  }

  return (
    <TemplateCliente>
      <Titulo>
        <UilShoppingCart />
        Carrinho de Compras
      </Titulo>

      <table className="carrinho__tabela">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.length === 0 && (
            <tr>
              <td>Seu carrinho está vazio</td>
            </tr>
          )}
          {carrinho.map((item) => {
            return <ItemCarrinho key={item.id} item={item} />;
          })}
        </tbody>
      </table>

      <div className="carrinho__total">
        <span>Total:</span>
        <span>
          {calcularTotal().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className="carrinho__botao-container">
        <Button onClick={confirmarPedido}>Fechar Pedido</Button>
      </div>
    </TemplateCliente>
  );
}
