import { TProduto } from '../lib/types';
import { useProdutoStore } from '../store/produtoStore';

describe('Teste da função somarCarrinho', () => {
  it('Deve somar corretamente o valor total do carrinho', () => {
    const somarCarrinho = useProdutoStore.getState().somarCarrinho;

    const carrinho: TProduto[] = [
      { id: 1, nome: 'Produto A', valor: 10, quantidade: 2, imagem: '', observacao: '' },
      { id: 2, nome: 'Produto B', valor: 15, quantidade: 1, imagem: '', observacao: '' },
      { id: 3, nome: 'Produto C', valor: 20, quantidade: 3, imagem: '', observacao: '' },
    ];

    const valorTotalEsperado = (10 * 2) + (15 * 1) + (20 * 3);

    const valorTotalCalculado = somarCarrinho(carrinho);

    expect(valorTotalCalculado).toEqual(valorTotalEsperado);
  });

  it('Deve retornar 0 para um carrinho vazio', () => {
    const somarCarrinho = useProdutoStore.getState().somarCarrinho;

    const carrinhoVazio: TProduto[] = [];

    const valorTotalCalculado = somarCarrinho(carrinhoVazio);

    expect(valorTotalCalculado).toEqual(0);
  });
});