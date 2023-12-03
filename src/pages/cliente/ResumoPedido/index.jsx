import { useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { UilReceipt, UilHome, UilDollarSign } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";

import { TemplateCliente } from "../../template/TemplateCliente";
import { useCarrinho } from "../../../context/ContextCarrinho";

import "./index.css";
import { ItemCarrinho } from "../Carrinho";
import { apiEnviarPedido } from "../../../services/requests";
import { useAuth } from "../../../context/AuthContext";

export function ResumoPedido() {
  const { verificarLogin } = useAuth();

  const {
    carrinho,
    validarCarrinhoEPagamento,
    calcularTotal,
    formaPgto,
    limparCarrinho,
  } = useCarrinho();
  const navigate = useNavigate();

  async function enviar() {
    try {
      const pedido = {
        itens: carrinho,
        id_cliente: localStorage.getItem("CAFE_ID_CLIENTE"),
        formaPgto: formaPgto,
        total: calcularTotal(),
        endereco: localStorage.getItem("CAFE_ENDERECO_CLIENTE"),
      };

      await apiEnviarPedido(pedido);
      toast.success("Pedido enviado! Aguardando confirmação...");
      navigate("/cliente/status-pedido");
      limparCarrinho();
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function iniciar() {
    await verificarLogin("Cliente");
    if (!validarCarrinhoEPagamento()) {
      return navigate("/cliente/vitrine");
    }
  }

  useEffect(() => {
    iniciar();
  }, []);
  return (
    <TemplateCliente>
      <Titulo>
        <UilReceipt />
        Resumo do Pedido
      </Titulo>

      <table className="carrinho__tabela">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item) => (
            <ItemCarrinho key={item.id} item={item} desabilitarEdicao />
          ))}
        </tbody>
      </table>

      <div className="carrinho__total">
        <span>Total</span>
        <span>
          {calcularTotal().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className="resumo-pedido__secao">
        <Titulo>
          <UilHome />
          Endereço de Entrega
        </Titulo>

        <div>
          <p>{localStorage.getItem("CAFE_ENDERECO_CLIENTE")}</p>
        </div>
      </div>

      <div className="resumo-pedido__secao">
        <Titulo>
          <UilDollarSign />
          Pagamento
        </Titulo>

        <div>
          <p>{formaPgto}</p>
        </div>
      </div>

      <div className="carrinho__botao-container">
        <Button onClick={enviar}>Confirmar Pedido</Button>
      </div>
    </TemplateCliente>
  );
}
