import "./header.scss";
import logo from "../../assets/images/mbst.svg";
import cart from "../../assets/icons/cart.svg";

export default function Header() {
  return (
    <header className="header-container">
      <img src={logo} alt="MBST Phone Store" width={74} height={24}></img>
      <button>
        <img src={cart}></img>
      </button>
    </header>
  );
}
