import "./cart-page.scss";
import Button from "../../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../state/cart.context";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem } = useCart();

  const totalPrice = items.reduce((acc, next) => acc + next.price, 0);
  const hasItems = !!items.length;
  const handleNavigate = () => {
    navigate("/list");
  };

  return (
    <div className="cart-page">
      <span className="cart-page__title">CART ({items.length})</span>
      <div className="cart-page__products">
        {items.map((item) => (
          <div className="product">
            <img className="product__image" src={item.color.imageUrl}></img>
            <div className="product__detail">
              <div className="product__detail--column">
                <span>{item.name.toUpperCase()}</span>
                <span>
                  {item.storage} | {item.color.name.toUpperCase()}
                </span>
              </div>
              <span>{item.price} EUR</span>
              <Button
                className="cart-page__delete"
                label="Eliminar"
                severity="danger"
                variant="ghost"
                onClick={() => removeItem(item.id)}
              ></Button>
            </div>
          </div>
        ))}
      </div>

      <footer className="cart-footer">
        {hasItems && (
          <div className="cart-footer__total">
            <span>TOTAL</span>
            <span>{totalPrice} EUR</span>
          </div>
        )}
        <div className="cart-footer__actions">
          <Button
            onClick={handleNavigate}
            label="CONTINUE SHOPPING"
            variant="outlined"
            className="cart-footer__actions--stretch"
          />
          {hasItems && (
            <Button
              onClick={() => {}}
              label="PAY"
              className="cart-footer__actions--stretch"
            />
          )}
        </div>
      </footer>
    </div>
  );
}
