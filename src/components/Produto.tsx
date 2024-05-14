import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProdutoStore } from "../store/produtoStore";
import Button from "./Button";

const Produto = () => {
  const { produtoID } = useParams<{ produtoID?: string }>();
  const [quantidade, setQuantidade] = useState(1);

  const fetchProdutoById = useProdutoStore(state => state.fetchProdutoById);
  const produto = useProdutoStore(state => state.produto);
  const adicionarProdutoAoCarrinho = useProdutoStore(state => state.adicionarProdutoAoCarrinho);
  const isLoading = useProdutoStore(state => state.isLoading);
  const successMessage = useProdutoStore(state => state.successMessage);
  const errorMessage = useProdutoStore(state => state.errorMessage);

  useEffect(() => {
    if (produtoID)
      fetchProdutoById(produtoID);
  }, [fetchProdutoById, produtoID]);

  const handleDecrementarQuantidade = () => {
    if (quantidade > 1)
      setQuantidade(prev => --prev);
  }

  const handleIncrementarQuantidade = () => {
    setQuantidade(prev => ++prev);
  }

  const handleNovoProduto = () => {
    if (produto) {
      const newProduto = {
        ...produto,
        quantidade,
      }

      adicionarProdutoAoCarrinho(newProduto)
    }
  }

  return (
    <div className="container">
      {isLoading && <div className="spinner" />}
      {errorMessage && <div className="error-message message">{errorMessage}</div>}
      {!isLoading && produto &&
        <div className="product-details">
          <h1>{produto?.nome}</h1>
          <img src={`../${produto?.imagem}`} alt={produto?.nome} />
          <p>{`R$ ${produto?.valor}`}</p>
          <span>{produto?.observacao}</span>
          <div className="quantity-controls">
            <Button onClick={handleDecrementarQuantidade}>-</Button>
            <span>{quantidade}</span>
            <Button onClick={handleIncrementarQuantidade}>+</Button>
          </div>
          <div className="product-buttons">
            <Link to="/">Voltar</Link>
            <Button onClick={handleNovoProduto}>Adicionar</Button>
          </div>
        </div>
      }
      {successMessage && <div className="success-message message">{successMessage}</div>}
    </div>
  )
}

export default Produto;