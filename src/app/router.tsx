import { createBrowserRouter, Navigate } from "react-router-dom";
import PhoneDetailPage from "../domains/catalog/features/phone-detail-page/phone-detail-page";
import PhoneListPage from "../domains/catalog/features/phone-list-page/phone-list-page";
import CartPage from "../domains/cart/features/cart/cart-page";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/list" replace />,
      },
      {
        path: "/list",
        element: <PhoneListPage />,
      },
      {
        path: "/phones/:phoneId",
        element: <PhoneDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
