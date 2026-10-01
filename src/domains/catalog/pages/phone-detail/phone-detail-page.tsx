import "./phone-detail-page.scss";
import ArrowLeftIcon from "../../../../assets/icons/arrow-left.svg?react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../../ui/product-info/product-info";
import { use } from "react";
import { getProductByIdSuspense } from "../../data-access/catalog-api";
import PhoneSpecifications from "../../ui/phone-specifications/phone-specifications";
import type { PhoneSpecificationProps } from "../../ui/phone-specifications/phone-specification.types";
import { toProductSpecificationsViewModel } from "../../ui/phone-specifications/phone-specification.mapper";
import { toPhoneCardViewModel } from "../../ui/phone-card/phone-card.mapper";
import PhoneCard from "../../ui/phone-card/phone-card";
import type { CartItem } from "../../../cart/types/cart.types";
import { useCart } from "../../../cart/state/cart.context";
import type { ProductDetail } from "../../types/product-detail.type";
import type { PhoneCardProps } from "../../ui/phone-card/phone-card.types";

export default function PhoneDetailPage() {
  const { phoneId } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!phoneId) {
    return null;
  }

  const phoneSource: ProductDetail = use(getProductByIdSuspense(phoneId));

  const phoneSpecifications: PhoneSpecificationProps =
    toProductSpecificationsViewModel(phoneSource);

  const getMappedPhoneCards = (): PhoneCardProps[] =>
    phoneSource.similarProducts.map((phone) => toPhoneCardViewModel(phone));

  const handleOnAdd = (colorId: string, storagePrice: number) => {
    const phoneColor = phoneSource.colors.find((color) => color.id === colorId);

    const phoneStorage = phoneSource.storageOptions.find(
      (option) => option.price === storagePrice,
    );

    if (!phoneColor || !phoneStorage) return;

    const cartItem: CartItem = {
      id: phoneSource.id,
      name: phoneSource.name,
      storage: phoneStorage.capacity,
      color: { name: phoneColor.name, imageUrl: phoneColor.imageUrl },
      price: phoneStorage.price,
    };

    addItem(cartItem);
    navigate("/cart");
  };

  return (
    <>
      <div className="link-container">
        <Link to="/list">
          <ArrowLeftIcon className="link-container__icon"></ArrowLeftIcon>
          <span>BACK</span>
        </Link>
      </div>
      <div className="phone-detail">
        {phoneSource && (
          <ProductInfo data={phoneSource} onAdd={handleOnAdd}></ProductInfo>
        )}
        {phoneSpecifications && (
          <PhoneSpecifications {...phoneSpecifications}></PhoneSpecifications>
        )}

        <div className="similar-phones">
          <span className="similar-phones__title">SIMILAR ITEMS</span>
          <div className="similar-phones__carrousel">
            {getMappedPhoneCards().map((phone) => (
              <Link
                to={`/phones/${phone.id}`}
                key={phone.id}
                className="similar-phones__carrousel--space"
              >
                <PhoneCard {...phone}></PhoneCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
