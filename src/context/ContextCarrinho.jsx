/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";

const CarrinhoContext = createContext();

const carrinhoReducer = (state, action) => {
  switch (action.type) {
    case "ADICIONAR_ITEM":
      const indexItemJaAdicionado = state.itens.findIndex(
        (item) => item.id === action.item.id
      );

      if (indexItemJaAdicionado >= 0) {
        return {
          ...state,
          itens: state.itens.map((item, index) => {
            if (index === indexItemJaAdicionado)
              return { ...item, quantidade: item.quantidade + 1 };
            return item;
          }),
        };
      }
      return {
        ...state,
        itens: [...state.itens, { ...action.item, quantidade: 1 }],
      };
    case "REMOVER_ITEM":
      return {
        ...state,
        itens: state.itens.filter((item) => item.id !== action.itemId),
      };
    case "ALTERAR_ITEM":
      return {
        ...state,
        itens: state.itens.map((item) => {
          if (item.id === action.item.id) {
            return { ...action.item };
          }
          return item;
        }),
      };
    case "LIMPAR_CARRINHO":
      return {
        ...state,
        formaPgto: "",
        itens: [],
      };
    case "ADICIONAR_PAGAMENTO": {
      return {
        ...state,
        formaPgto: action.formaPgto,
      };
    }
    default:
      return state;
  }
};

export const CarrinhoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carrinhoReducer, { itens: [] });

  const adicionarItem = (item) => {
    dispatch({ type: "ADICIONAR_ITEM", item });
  };

  const removerItem = (itemId) => {
    dispatch({ type: "REMOVER_ITEM", itemId });
  };

  const limparCarrinho = () => {
    dispatch({ type: "LIMPAR_CARRINHO" });
  };

  const alterarItem = (item) => {
    dispatch({ type: "ALTERAR_ITEM", item });
  };

  const calcularTotal = () =>
    state.itens.reduce((prev, curr) => +curr.valor * curr.quantidade + prev, 0);

  const adicionarPagamento = (formaPgto) =>
    dispatch({
      type: "ADICIONAR_PAGAMENTO",
      formaPgto,
    });

  const validarCarrinho = () => {
    return state.itens.length > 0;
  };

  const validarCarrinhoEPagamento = () => {
    return validarCarrinho() && state.formaPgto;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: state.itens,
        formaPgto: state.formaPgto,
        adicionarItem,
        removerItem,
        limparCarrinho,
        alterarItem,
        calcularTotal,
        adicionarPagamento,
        validarCarrinho,
        validarCarrinhoEPagamento,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error(
      "useCarrinho deve ser utilizado dentro de CarrinhoProvider"
    );
  }
  return context;
};
