import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UilTruck,
  UilTimesCircle,
  UilCheck,
  UilClock,
} from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";

import { TemplateFuncionario } from "../../template/TemplateFuncionario";
import { apiListarPedido } from "../../../services/requests";

import "./index.css";
import { useAuth } from "../../../context/AuthContext";

export function Pedidos() {
  const [pedidos, setPedidos] = useState();
  const [ocultarEntregues, setOcultarEntregues] = useState(false);

  const navigate = useNavigate();
  const { verificarLogin } = useAuth();

  function verDetalhesPedido(id) {
    navigate("/adm/pedido/" + id);
  }

  async function carregarPedidos() {
    try {
      const res = await apiListarPedido();
      setPedidos(res.data.pedidos);
    } catch (err) {
      toast.error(err.response.data.erro || "Ocorreu um erro");
    }
  }

  async function iniciar() {
    await verificarLogin("Funcionário");
    carregarPedidos();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateFuncionario>
      <Titulo>
        <UilTruck />
        Pedidos
      </Titulo>

      <div className="pedidos__botao-container">
        <a onClick={() => setOcultarEntregues(!ocultarEntregues)}>
          {ocultarEntregues ? "Mostrar" : "Ocultar"} Pedidos Entregues
        </a>
      </div>

      <ul className="pedidos__lista">
        {pedidos
          ?.filter((pedido) => {
            return ocultarEntregues ? pedido.status !== "Entregue" : true;
          })
          ?.map((pedido) => (
            <li key={pedido.id}>
              <Button
                style={{ width: "85px" }}
                onClick={() => verDetalhesPedido(pedido.id)}
              >
                Pedido {pedido.id}
              </Button>{" "}
              <span>Pedido {pedido.status}</span>
              {pedido.status === "Pendente" && <UilClock />}
              {pedido.status === "Recusado" && <UilTimesCircle />}
              {pedido.status === "Preparo" && <UilClock />}
              {pedido.status === "Entregue" && <UilCheck />}
              {pedido.status === "Em Rota" && <UilTruck />}
            </li>
          ))}
      </ul>
    </TemplateFuncionario>
  );
}
