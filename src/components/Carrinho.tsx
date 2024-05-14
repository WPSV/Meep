import { useProdutoStore } from "../store/produtoStore";
import { TProduto } from "../lib/types";
import { useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Carrinho = () => {
  const carrinho = useProdutoStore(state => state.carrinho);
  const decrementarQuantidade = useProdutoStore(state => state.decrementarQuantidade);
  const incrementarQuantidade = useProdutoStore(state => state.incrementarQuantidade);
  const removerProdutoDoCarrinho = useProdutoStore(state => state.removerProdutoDoCarrinho);
  const valorTotalCarrinho = useProdutoStore(state => state.somarCarrinho(state.carrinho));
  const solicitarPedido = useProdutoStore(state => state.solicitarPedido);
  const successMessage = useProdutoStore(state => state.successMessage);
  const limparSuccessMessage = useProdutoStore(state => state.limparSuccessMessage);
  const isLoading = useProdutoStore(state => state.isLoading);

  const handleDecrementarQuantidade = (produto: TProduto) => {
    decrementarQuantidade(produto);
  }

  const handleIncrementarQuantidade = (produto: TProduto) => {
    incrementarQuantidade(produto);
  }

  const handleRemoverProdutoDoCarrinho = (produto: TProduto) => {
    removerProdutoDoCarrinho(produto.id, produto.valor);
  }

  useEffect(() => {
    limparSuccessMessage();
  }, []);

  return (
    <ul className="container cart-list">
      {
        carrinho.length > 0 && carrinho.map((produtoCarrinho) => (
          <li key={produtoCarrinho.id}>
            <img src={produtoCarrinho.imagem} alt={produtoCarrinho.nome} />
            <div className="item-info">
              <p>{produtoCarrinho.nome} - {produtoCarrinho.observacao}</p>
              <p>Valor unitário: R$ {produtoCarrinho.valor}</p>
              <p>Valor total: R$ {(produtoCarrinho.valor * produtoCarrinho.quantidade).toFixed(2)}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleDecrementarQuantidade(produtoCarrinho)}>-</button>
              <span>{produtoCarrinho.quantidade}</span>
              <button onClick={() => handleIncrementarQuantidade(produtoCarrinho)}>+</button>
              <button onClick={() => handleRemoverProdutoDoCarrinho(produtoCarrinho)}>Remover</button>
            </div>
          </li>
        ))
      }
      {!successMessage && carrinho.length === 0 && <div className="empty-cart">Nenhum produto no carrinho!</div>}
      {successMessage && <div className="success-message message">{successMessage}</div>}
      <li className="cart-buttons">
        <span>Total: R$ {valorTotalCarrinho.toFixed(2)}</span>
        <div>
          <Link to="/">Voltar</Link>
          <Button disabled={carrinho.length === 0} onClick={solicitarPedido}>{!isLoading ? "Fazer pedido" : "Solicitando..."}</Button>
        </div>
      </li>
    </ul>
  )
}

export default Carrinho;