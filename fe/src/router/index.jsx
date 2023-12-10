import "../App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import CLIENT_ENDPOINT from "../constants/client-endpoint";

function Router() {
  const router = createBrowserRouter([
    {
      path: CLIENT_ENDPOINT.INDEX,
      element: <Layout />,
      children: [
        {
          path: CLIENT_ENDPOINT.USER,
          element: <Customers />,
        },
        {
          path: CLIENT_ENDPOINT.PRODUCT,
          element: <Products />,
        },
      ],
    },
    {
      path: CLIENT_ENDPOINT.LOGIN,
      element: <Login />,
    },
    {
      path: CLIENT_ENDPOINT.REGISTER,
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
