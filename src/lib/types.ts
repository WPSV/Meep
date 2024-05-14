export type Store = {
  produtos: TProduto[];
  valor: number;
  produto: TProduto | null;
  carrinho: TProduto[];
  isLoading: boolean,
  successMessage: string,
  errorMessage: string,
  fetchProdutos: () => Promise<void>;
  fetchProdutoById: (produtoID: string) => Promise<void>;
  decrementarQuantidade: (produto: TProduto) => void;
  incrementarQuantidade: (produto: TProduto) => void;
  adicionarProdutoAoCarrinho: (newProduto: TProduto) => void;
  removerProdutoDoCarrinho: (id: number, valor: number) => void;
  somarCarrinho: (carrinho: TProduto[]) => number;
  solicitarPedido: () => Promise<void>;
  limparSuccessMessage: () => void,
}

export type TProduto = {
  id: number,
  nome: string,
  valor: number,
  imagem: string,
  quantidade: number,
  observacao: string,
}