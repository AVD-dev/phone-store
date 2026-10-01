import { createBrowserRouter, Navigate } from "react-router-dom";
import PhoneDetailPage from "../domains/catalog/pages/phone-detail/phone-detail-page";
import PhoneListPage from "../domains/catalog/pages/phone-list/phone-list-page";
import CartPage from "../domains/cart/pages/cart/cart-page";
import App from "./App";
import { Suspense } from "react";

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
        element: (
          <Suspense fallback="Skeletons WIP...">
            <PhoneListPage />
          </Suspense>
        ),
      },
      {
        path: "/phones/:phoneId",
        element: (
          <Suspense fallback="Skeletons WIP...">
            <PhoneDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
