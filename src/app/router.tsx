import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import PhoneDetailPage from "../domains/catalog/pages/phone-detail/phone-detail-page";
import PhoneListPage from "../domains/catalog/pages/phone-list/phone-list-page";
import CartPage from "../domains/cart/pages/cart/cart-page";
import App from "./App";
import { Suspense } from "react";
import Spinner from "../components/spinner/spinner";

const PhoneDetailRoute = () => {
  const { phoneId } = useParams();

  return (
    <Suspense key={phoneId} fallback={<Spinner />}>
      <PhoneDetailPage />
    </Suspense>
  );
};

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
          <Suspense fallback={<Spinner />}>
            <PhoneListPage />
          </Suspense>
        ),
      },
      {
        path: "/phones/:phoneId",
        element: <PhoneDetailRoute />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
