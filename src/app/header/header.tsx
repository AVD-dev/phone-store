import "./header.scss";
import logo from "../../assets/images/mbst.svg";
import CartLink from "../../domains/cart/ui/cart-link/cart-link";

export default function Header() {
  return (
    <header className="header-container">
      <img src={logo} alt="MBST Phone Store" width={74} height={24}></img>
      <CartLink />
    </header>
  );
}
