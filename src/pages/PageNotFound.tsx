import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      Página não encontrada. Erro: 404
      <Link to="/">Voltar</Link>
    </div>
  )
}

export default PageNotFound;