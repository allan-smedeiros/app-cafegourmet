import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UilApps } from "@iconscout/react-unicons";

import { Titulo } from "../../../components/Titulo";
import { TemplateCliente } from "../../template/TemplateCliente";
import { ProdutoCliente } from "../../../components/ProdutoCliente";

import { apiListarProdutos } from "../../../services/requests";
import "./index.css";
import { useAuth } from "../../../context/AuthContext";

export function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const { verificarLogin } = useAuth();

  async function listarProdutos() {
    try {
      const res = await apiListarProdutos();
      setProdutos(
        res.data.produtos.filter((produto) => produto.mostrar_vitrine)
      );
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  async function iniciar() {
    await verificarLogin("Cliente");
    listarProdutos();
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <TemplateCliente>
      <Titulo>
        <UilApps />
        Vitrine de Produtos
      </Titulo>

      <div className="vitrine__produtos-grid">
        {produtos.map((produto) => (
          <ProdutoCliente
            key={produto.id}
            {...produto}
            dadosDoProdutoCompletos={produto}
          />
        ))}
      </div>
    </TemplateCliente>
  );
}
