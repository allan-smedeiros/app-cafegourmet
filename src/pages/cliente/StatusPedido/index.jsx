import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { UilTruck, UilClock, UilArrowLeft } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";

import { TemplateCliente } from "../../template/TemplateCliente";
import { apiUltimoPedidoUsuario } from "../../../services/requests";

import "./index.css";
import { useAuth } from "../../../context/AuthContext";

export function StatusPedido() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({});
  const { verificarLogin } = useAuth();

  async function pegarUltimoPedido() {
    try {
      const res = await apiUltimoPedidoUsuario();

      if (!res.data.pedido) {
        navigate("/cliente/vitrine");
      }

      setPedido(res.data.pedido);
    } catch (err) {
      toast.error(err.response.data.erro || "Ocorreu um erro");
    }
  }

  function iconeStatus(statusLinha) {
    if (statusLinha === pedido.status) {
      return <UilArrowLeft />;
    }

    return <></>;
  }

  function estiloStatus(statusLinha) {
    if (statusLinha === pedido.status) {
      return "status__atual";
    }

    return "";
  }

  async function iniciar() {
    await verificarLogin("Cliente");
    pegarUltimoPedido();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateCliente>
      <Titulo>
        <UilTruck />
        Status do Pedido {pedido?.id && `(${pedido.id})`}
      </Titulo>

      {pedido?.status !== "Recusado" && (
        <>
          <ul className="status__lista">
            <li className={estiloStatus("Pendente")}>
              <span>Pedido Solicitado</span> {iconeStatus("Pendente")}
            </li>
            <li className={estiloStatus("Preparo")}>
              <span>Pedido em Preparo</span> {iconeStatus("Preparo")}
            </li>
            <li className={estiloStatus("Em Rota")}>
              <span>Pedido em Transporte</span> {iconeStatus("Em Rota")}
            </li>
            <li className={estiloStatus("Entregue")}>
              <span>Pedido Entregue</span> {iconeStatus("Entregue")}
            </li>
          </ul>
          <p className="status__aviso-espera">
            <UilClock />
            Tempo médio de espera: 40 minutos
          </p>
        </>
      )}

      {pedido?.status === "Recusado" && (
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          Seu pedido foi recusado pelo restaurante.
        </p>
      )}

      <div className="carrinho__botao-container">
        <Button onClick={() => navigate("/cliente/vitrine")}>
          Ir para o início
        </Button>
      </div>
    </TemplateCliente>
  );
}
