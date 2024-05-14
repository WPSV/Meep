import { Link } from "react-router-dom";
import { useProdutoStore } from "../store/produtoStore";

const Catalogo = () => {
  const produtos = useProdutoStore(state => state.produtos);
  const valorTotalCarrinho = useProdutoStore(state => state.somarCarrinho(state.carrinho));
  const isLoading = useProdutoStore(state => state.isLoading);
  const errorMessage = useProdutoStore(state => state.errorMessage);

  return (
    <section className="container catalog-section">
      <div>
        <h1>Catalogo</h1>
        {isLoading && <div className="spinner" />}
        {errorMessage && <div className="error-message message">{errorMessage}</div>}
        <ul>
          {!isLoading &&
            produtos.map((produto) => (
              <li key={produto.id}>
                <Link to={`produto/${produto.id}`}>
                  <img src={produto.imagem} alt="" />
                  <div>
                    <p>{produto.nome}</p>
                    <p>{`R$ ${produto.valor}`}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <footer>
        <span>{`${produtos.length} produtos`}</span>
        <span>
          <Link to="carrinho">Carrinho</Link>
        </span>
        <span>Total R$ {valorTotalCarrinho.toFixed(2)}</span>
      </footer>
    </section>
  )
}

export default Catalogo;