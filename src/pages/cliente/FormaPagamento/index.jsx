import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UilDollarSign,
  UilCreditCard,
  UilExchange,
} from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { Button } from "../../../components/Button";
import { TemplateCliente } from "../../template/TemplateCliente";

import { useCarrinho } from "../../../context/ContextCarrinho";
import "./index.css";
import { useAuth } from "../../../context/AuthContext";

export function FormaPagamento() {
  const { validarCarrinho, adicionarPagamento } = useCarrinho();
  const navigate = useNavigate();
  const { verificarLogin } = useAuth();

  function selecionarPagamento(valor) {
    adicionarPagamento(valor);
    navigate("/cliente/resumo-pedido");
  }

  async function iniciar() {
    await verificarLogin("Cliente");
    if (!validarCarrinho()) {
      return navigate("/cliente/vitrine");
    }
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateCliente>
      <Titulo>
        <UilDollarSign />
        Forma de Pagamento
      </Titulo>

      <div className="forma-pagamento__aviso">
        <p>Selecione a forma de pagamento:</p>
      </div>

      <div className="forma-pagamento__container">
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".75rem",
            fontSize: ".875rem",
          }}
          onClick={() => selecionarPagamento("Cartão")}
        >
          <UilCreditCard />
          Cartão de Crédito / Débito
        </Button>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".75rem",
            fontSize: ".875rem",
          }}
          onClick={() => selecionarPagamento("PIX")}
        >
          <UilExchange />
          PIX
        </Button>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".75rem",
            fontSize: ".875rem",
          }}
          onClick={() => selecionarPagamento("Dinheiro")}
        >
          <UilCreditCard />
          Dinheiro
        </Button>
      </div>

      <div className="forma-pagamento__aviso">
        <p> * Pagamento apenas na entrega *</p>
      </div>
    </TemplateCliente>
  );
}
