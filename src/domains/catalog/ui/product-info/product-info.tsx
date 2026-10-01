import { useState } from "react";
import "./product-info.scss";
import Button from "../../../../components/button/button";
import type { ProductInfoProps } from "./product-info.types";
import type { ColorOption } from "../../../../components/color-selector/color-selector.types";
import type {
  ProductColor,
  ProductStorage,
} from "../../types/product-detail.type";
import ColorSelector from "../../../../components/color-selector/color-selector";

export default function ProductInfo({ data, onAdd }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>();
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage>();

  const priceLabel = selectedStorage
    ? `${selectedStorage.price} EUR`
    : `From ${data.basePrice} EUR`;

  const isDisabled = !selectedColor || !selectedStorage;

  const phoneColorImage = selectedColor
    ? selectedColor.imageUrl
    : data.imageUrl;

  const colorOptions: ColorOption[] = data.colors.map(
    ({ hexCode, ...data }) => ({
      ...data,
      value: hexCode,
    }),
  );

  const handleOnAdd = (): void => {
    if (selectedColor && selectedStorage) {
      onAdd(selectedColor.id, selectedStorage.id);
      return;
    }

    return;
  };

  const handleOnChangeSelectedColor = (optionId: string): void => {
    const color = data.colors.find((c) => c.id === optionId);
    setSelectedColor(color);
  };

  return (
    <>
      <div className="info-container">
        <img className="product-image" src={phoneColorImage}></img>
        <div className="product-info">
          <div className="product-title">
            <span className="product-title__name">{data.name}</span>
            <span className="product-info--medium">{priceLabel}</span>
          </div>

          <div>
            <span className="product-info--small">
              STORAGE: ¿HOW MUCH SPACE DO YOU NEED?
            </span>
            <div className="product-selector">
              {data.storageOptions &&
                data.storageOptions.map((option) => (
                  <label
                    className="product-selector__radio product-info--small"
                    key={option.capacity}
                  >
                    <input
                      type="radio"
                      name="storage-option"
                      value={option.id}
                      checked={selectedStorage?.id === option.id}
                      onChange={() => setSelectedStorage(option)}
                    ></input>
                    <span>{option.capacity}</span>
                  </label>
                ))}
            </div>

            {data.colors && (
              <div className="product-color">
                <span className="product-info--small">
                  COLOR: PICK YOUR FAVORITE.
                </span>
                <ColorSelector
                  colors={colorOptions}
                  selectedColor={selectedColor?.id}
                  onChange={(colorOption) =>
                    handleOnChangeSelectedColor(colorOption.id)
                  }
                ></ColorSelector>
              </div>
            )}
          </div>

          <Button
            label="AÑADIR"
            disabled={isDisabled}
            onClick={handleOnAdd}
          ></Button>
        </div>
      </div>
    </>
  );
}
