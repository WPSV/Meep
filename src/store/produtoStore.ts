import { create } from "zustand";
import { Store, TProduto } from "../lib/types";

export const useProdutoStore = create<Store>((set) => ({
  produtos: [],
  valor: 0,
  produto: null,
  carrinho: [],
  isLoading: false,
  successMessage: "",
  errorMessage: "",

  fetchProdutos: async () => {
    set(() => ({
      isLoading: true
    }));

    try {
      const response = await fetch("http://localhost:3001/produtos");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      set(() => ({
        produtos: data,
      }));
    } catch {
      set(() => ({
        isLoading: false,
        errorMessage: "Algo deu errado! Por favor tente novamente mais tarde."
      }));
    }

    set(() => ({
      isLoading: false
    }));
  },

  fetchProdutoById: async (produtoID: string) => {
    set(() => ({
      isLoading: true,
      successMessage: ""
    }));

    try {
      const response = await fetch(`http://localhost:3001/produtos/${produtoID}`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      set(() => ({
        produto: data,
      }));
    } catch {
      set(() => ({
        isLoading: false,
        errorMessage: "Algo deu errado! Por favor tente novamente mais tarde."
      }));
    }

    set(() => ({
      isLoading: false
    }));
  },

  decrementarQuantidade: (produto: TProduto) => {
    set((state) => {
      const carrinhoAtualizado = state.carrinho.map((produtoCarrinho) => {
        if (produtoCarrinho.id === produto.id) {

          const novaQuantidade = produtoCarrinho.quantidade > 1 ? produtoCarrinho.quantidade - 1 : 1;

          return {
            ...produtoCarrinho,
            quantidade: novaQuantidade,
          };
        }

        return produtoCarrinho;
      });

      return {
        ...state,
        carrinho: carrinhoAtualizado,
        valor: state.somarCarrinho(carrinhoAtualizado),
      };
    });
  },

  incrementarQuantidade: (produto: TProduto) => {
    set((state) => {
      const carrinhoAtualizado = state.carrinho.map((produtoCarrinho) => {
        if (produtoCarrinho.id === produto.id) {
          const novaQuantidade = produtoCarrinho.quantidade + 1;

          return {
            ...produtoCarrinho,
            quantidade: novaQuantidade,
          };
        }
        return produtoCarrinho;
      });

      return {
        ...state,
        carrinho: carrinhoAtualizado,
        valor: state.somarCarrinho(carrinhoAtualizado),
      };
    });
  },

  adicionarProdutoAoCarrinho: (newProduto: TProduto) => {
    set((state) => {
      state.successMessage = "";

      const produtoJaAdicionado = state.carrinho.find(
        (produtoCarrinho) => produtoCarrinho.id === newProduto.id
      );

      if (produtoJaAdicionado) {
        const carrinhoAtualizado = state.carrinho.map((produtoCarrinho) =>
          produtoCarrinho.id === newProduto.id
            ? {
              ...produtoCarrinho,
              quantidade: produtoCarrinho.quantidade + newProduto.quantidade,
              valor: produtoCarrinho.valor,
            }
            : produtoCarrinho
        );

        return {
          carrinho: carrinhoAtualizado,
          valor: state.somarCarrinho(carrinhoAtualizado),
          successMessage: "Produto adicionado ao carrinho!",
        };
      }

      return {
        ...state,
        carrinho: [...state.carrinho, newProduto],
        valor: state.somarCarrinho([...state.carrinho, newProduto]),
        successMessage: "Produto adicionado ao carrinho!",
      };
    });
  },

  removerProdutoDoCarrinho: (id: number, valor: number) => {
    set((state) => ({
      ...state,
      carrinho: state.carrinho.filter((produto) => produto.id !== id),
      valor: state.valor - valor,
    }));
  },

  solicitarPedido: async () => {
    set(() => ({
      isLoading: true
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    set(() => ({
      carrinho: [],
      valor: 0,
      successMessage: "Pedido concluido com sucesso!",
      isLoading: false
    }));
  },

  somarCarrinho: (carrinho: TProduto[]) => {
    return carrinho.reduce((total, produto) => {
      return total + (produto.valor * produto.quantidade);
    }, 0);
  },

  limparSuccessMessage: () => {
    set((state) => ({
      ...state,
      successMessage: "",
    }));
  },
}));
