import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useProdutoStore } from "./store/produtoStore";

function Root() {
  const fetchProdutos = useProdutoStore(state => state.fetchProdutos);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return (
    <main className="container">
      <Outlet />
    </main>
  )
}

export default Root;
