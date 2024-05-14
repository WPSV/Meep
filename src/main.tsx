import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Catalogo from "./components/Catalogo";
import Produto from "./components/Produto";
import Carrinho from "./components/Carrinho";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children :[
      {
        path: "/",
        element: <Catalogo />
      },
      {
        path: "produto/:produtoID",
        element: <Produto />
      },
      {
        path: "carrinho",
        element: <Carrinho />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
