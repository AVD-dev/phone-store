import "./cart-link.scss";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "../../../../assets/icons/cart.svg?react";
import { useCart } from "../../state/use-cart";

export default function CartLink() {
  const { items } = useCart();
  const { pathname } = useLocation();
  const showCartButton = pathname !== "/cart";

  return (
    <>
      {showCartButton && (
        <Link to="/cart" className="cart-link">
          <CartIcon />
          <span>{items.length}</span>
        </Link>
      )}
    </>
  );
}
