import "./phone-detail-page.scss";
import ArrowLeftIcon from "../../../../assets/icons/arrow-left.svg?react";
import { Link, useParams } from "react-router-dom";
import ProductInfo from "../../ui/product-info/product-info";
import { useEffect, useState } from "react";
import { getProductById } from "../../data-access/catalog-api";
import type { ProductDetailDto } from "../../data-access/product-summary.dto";
import { toProductInfoViewModel } from "./phone-detail.mapper";
import type { ProductInfoData } from "../../ui/product-info/product-info.types";
import PhoneSpecifications from "../../ui/phone-specifications/phone-specifications";
import type { PhoneSpecificationProps } from "../../ui/phone-specifications/phone-specification.types";
import { toProductSpecificationsViewModel } from "./phone-specification.mapper";
import { useCart } from "../../../cart/state/use-cart";
import type { CartItem } from "../../../cart/state/cart.types";
import type { PhoneListItemViewModel } from "../phone-list/phone-list.viewmodel";
import { toPhoneCardViewModel } from "../phone-list/phone-list.mapper";
import PhoneCard from "../../ui/phone-card/phone-card";

export default function PhoneDetailPage() {
  const { phoneId } = useParams();
  const { addItem } = useCart();

  const [phoneSource, setProductDetail] = useState<ProductDetailDto | null>(
    null,
  );

  const phoneInfo: ProductInfoData | null = phoneSource
    ? toProductInfoViewModel(phoneSource)
    : null;

  const phoneSpecifications: PhoneSpecificationProps | null = phoneSource
    ? toProductSpecificationsViewModel(phoneSource)
    : null;

  const getMappedPhoneCards = (): PhoneListItemViewModel[] => {
    if (!phoneSource) return [];

    return phoneSource.similarProducts.map((phone) =>
      toPhoneCardViewModel(phone),
    );
  };

  useEffect(() => {
    if (!phoneId) return;

    getProductById(phoneId).then(setProductDetail);
  }, [phoneId]);

  const handleOnAdd = (hexCode: string, storagePrice: number) => {
    const phoneColor = phoneSource?.colorOptions.find(
      (color) => color.hexCode === hexCode,
    );
    const phoneStorage = phoneSource?.storageOptions.find(
      (option) => option.price === storagePrice,
    );

    if (!phoneSource || !phoneColor || !phoneStorage) return;

    const cartItem: CartItem = {
      id: phoneSource.id,
      name: phoneSource.name,
      storage: phoneStorage.capacity,
      color: { name: phoneColor.name, imageUrl: phoneColor.imageUrl },
      price: phoneStorage.price,
    };

    addItem(cartItem);
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
        {phoneInfo && (
          <ProductInfo data={phoneInfo} onAdd={handleOnAdd}></ProductInfo>
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
                <PhoneCard {...phone.card}></PhoneCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
