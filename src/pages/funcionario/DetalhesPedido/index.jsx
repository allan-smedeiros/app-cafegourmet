import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UilReceipt, UilHome, UilDollarSign } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext";

import { TemplateFuncionario } from "../../template/TemplateFuncionario";

import "./index.css";
import {
  apiAtualizarPedido,
  apiListarPedido,
} from "../../../services/requests";

export function DetalhesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({});
  const { verificarLogin } = useAuth();

  async function carregarPedido() {
    try {
      const res = await apiListarPedido();
      const pedidoAtual = res.data.pedidos.find((pedido) => +pedido.id === +id);

      if (!pedidoAtual) {
        navigate("/adm/pedidos");
      }

      setPedido(pedidoAtual);
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function atualizarStaus(status) {
    try {
      await apiAtualizarPedido(id, status);
      toast.success("Status alterado para " + status);

      navigate("/adm/pedidos");
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function iniciar() {
    await verificarLogin("Funcionário");
    carregarPedido();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateFuncionario>
      <Titulo>
        <UilReceipt />
        Detalhes do Pedido {pedido?.id} (
        {pedido ? new Date(pedido?.createdAt)?.toLocaleDateString("pt-BR") : ""}
        ) - {pedido?.status}
      </Titulo>

      <table className="carrinho__tabela">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {pedido?.produtos_pedidos?.map((item) => (
            <tr key={item.id}>
              <td>
                {item.nome} -{" "}
                {Number(item.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="carrinho__tabela-quantidade">
                <input type="number" value={item.quantidade} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="carrinho__total">
        <span>Total:</span>
        <span>
          {" "}
          {Number(pedido?.total).toLocaleString("pt-BR", {
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
          <p>{pedido.endereco}</p>
        </div>
      </div>

      <div className="resumo-pedido__secao">
        <Titulo>
          <UilDollarSign />
          Pagamento
        </Titulo>

        <div>
          <p>{pedido.forma_pgto}</p>
        </div>
      </div>

      <div className="detalhes-pedido__botao-container">
        <Button onClick={() => atualizarStaus("Preparo")}>Aceitar</Button>
        <Button onClick={() => atualizarStaus("Recusado")}>Recusar</Button>
        <Button onClick={() => atualizarStaus("Em Rota")}>Em Rota</Button>
        <Button onClick={() => atualizarStaus("Entregue")}>Entregar</Button>
      </div>
    </TemplateFuncionario>
  );
}
