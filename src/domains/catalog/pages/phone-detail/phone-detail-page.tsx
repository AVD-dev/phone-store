import "./phone-detail-page.scss";
import ArrowLeftIcon from "../../../../assets/icons/arrow-left.svg?react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../../../../components/product-info/product-info";
import { use, useState } from "react";
import { getProductByIdSuspense } from "../../data-access/catalog-api";
import PhoneSpecifications from "../../../../components/phone-specifications/phone-specifications";
import { toPhoneSpecificationsViewModel } from "../../view-models/phone-specifications/phone-specifications.mapper";

import PhoneCard from "../../../../components/phone-card/phone-card";
import { useCart } from "../../../cart/state/cart.context";
import type { ProductDetail } from "../../types/product-detail.type";
import { toCartItem } from "./phone-detail-page.mapper";
import { toProductInfoViewModel } from "../../view-models/product-info/product-info.mapper";
import type { CatalogPhoneCardViewModel } from "../../view-models/phone-card/phone-card.view-model";
import { toPhoneCardViewModel } from "../../view-models/phone-card/phone-card.mapper";

export default function PhoneDetailPage() {
  const { phoneId } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [selectedColorId, setSelectedColorId] = useState<string>();
  const [selectedStorageId, setSelectedStorageId] = useState<string>();

  if (!phoneId) {
    return null;
  }

  const phoneSource: ProductDetail = use(getProductByIdSuspense(phoneId));
  const productInfo = toProductInfoViewModel(phoneSource);

  const phoneSpecifications = toPhoneSpecificationsViewModel(phoneSource);

  const getMappedPhoneCards = (): CatalogPhoneCardViewModel[] =>
    phoneSource.similarProducts.map((phone) => toPhoneCardViewModel(phone));

  const handleOnAdd = () => {
    if (!selectedColorId || !selectedStorageId) return;

    const cartItem = toCartItem(phoneSource, {
      colorId: selectedColorId,
      storageId: selectedStorageId,
    });

    if (!cartItem) return;

    addItem(cartItem);
    navigate("/cart");
  };

  return (
    <>
      <div className="link-container">
        <Link to="/list" viewTransition>
          <ArrowLeftIcon className="link-container__icon"></ArrowLeftIcon>
          <span>BACK</span>
        </Link>
      </div>
      <div className="phone-detail">
        <ProductInfo
          {...productInfo}
          selectedColorId={selectedColorId}
          selectedStorageId={selectedStorageId}
          onColorChange={setSelectedColorId}
          onStorageChange={setSelectedStorageId}
          onAdd={handleOnAdd}
        ></ProductInfo>
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
                viewTransition
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
