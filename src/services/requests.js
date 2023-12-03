import { api } from "./api";

export const apiListarProdutos = async () => await api.get("/produto");
export const apiCadastrarProduto = async (data) =>
  await api.post("/produto", data);
export const apiAtualizarProduto = async (id, data) =>
  await api.put("/produto/" + id, data);

export const apiEnviarPedido = async (data) => await api.post("/pedido", data);

export const apiListarPedido = async () => await api.get("/pedido");
export const apiAtualizarPedido = async (id, status) =>
  await api.put("/pedido/" + id, { status });
export const apiUltimoPedidoUsuario = async () =>
  api.get("/pedido/cliente/" + localStorage.getItem("CAFE_ID_CLIENTE"));

export const apiCadastrarCliente = async (data) =>
  await api.post("/cliente", data);
export const apiListarCliente = async () => await api.get("/cliente");
export const apiAtualizarCliente = async (id, data) =>
  await api.put("/cliente/" + id, data);

export const apiLoginCliente = async (data) =>
  await api.post("/cliente/login", data);

export const apiLoginFuncionario = async (data) =>
  await api.post("/funcionario/login", data);
