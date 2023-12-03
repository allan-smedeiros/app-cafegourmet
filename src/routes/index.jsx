import { createBrowserRouter } from "react-router-dom";

import { TelaInicial } from "../pages/global/TelaInicial";
import { PaginaErro } from "../pages/global/Erro";
import { Login } from "../pages/global/Login";
import { Cadastro } from "../pages/global/Cadastro";
import { Vitrine } from "../pages/cliente/Vitrine";
import { Carrinho } from "../pages/cliente/Carrinho";
import { FormaPagamento } from "../pages/cliente/FormaPagamento";
import { ResumoPedido } from "../pages/cliente/ResumoPedido";
import { StatusPedido } from "../pages/cliente/StatusPedido";
import { MeuPerfil } from "../pages/cliente/MeuPerfil";
import { Pedidos } from "../pages/funcionario/Pedidos";
import { DetalhesPedido } from "../pages/funcionario/DetalhesPedido";
import { GerenciarVitrine } from "../pages/funcionario/GerenciarVitrine";
import { FormProduto } from "../pages/funcionario/FormProduto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TelaInicial />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/login-cliente",
    element: <Login tipo="Cliente" />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/login-funcionario",
    element: <Login tipo="Funcionário" />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/vitrine",
    element: <Vitrine />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/carrinho",
    element: <Carrinho />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/forma-pagamento",
    element: <FormaPagamento />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/resumo-pedido",
    element: <ResumoPedido />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/status-pedido",
    element: <StatusPedido />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/cliente/meu-perfil",
    element: <MeuPerfil />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/adm/pedidos",
    element: <Pedidos />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/adm/pedido/:id",
    element: <DetalhesPedido />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/adm/vitrine",
    element: <GerenciarVitrine />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/adm/cadastro-produto",
    element: <FormProduto />,
    errorElement: <PaginaErro />,
  },
  {
    path: "/adm/cadastro-produto/:id",
    element: <FormProduto />,
    errorElement: <PaginaErro />,
  },
]);
