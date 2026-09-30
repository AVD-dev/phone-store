import { useState } from "react";
import SelectColor from "../../../ui/color-selector/color-selector";
import "./product-info.scss";
import Button from "../../../ui/button/button";
import type { ProductInfoProps } from "./product-info.types";
import type { ColorOption } from "../../../ui/color-selector/color-selector.types";

export default function ProductInfo({ data, onAdd }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>();
  const [selectedStoragePrice, setSelectedStoragePrice] = useState<number>();

  const priceLabel = selectedStoragePrice
    ? `${selectedStoragePrice} EUR`
    : `From ${data.basePrice} EUR`;

  const isDisabled = !selectedColor || !selectedStoragePrice;

  const phoneColorImage = selectedColor
    ? selectedColor.imageUrl
    : data.imageUrl;

  const handleOnAdd = (): void => {
    if (selectedColor && selectedStoragePrice) {
      onAdd(selectedColor.value, selectedStoragePrice);
      return;
    }

    return;
  };

  return (
    <>
      <div className="product-info">
        <img width="273px" height="260px" src={phoneColorImage}></img>

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
                    value={option.price}
                    checked={selectedStoragePrice === option.price}
                    onChange={() => setSelectedStoragePrice(option.price)}
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
              <SelectColor
                colors={data.colors}
                selectedColor={selectedColor?.value}
                onChange={setSelectedColor}
              ></SelectColor>
            </div>
          )}
        </div>

        <Button
          label="AÑADIR"
          disabled={isDisabled}
          onClick={handleOnAdd}
        ></Button>
      </div>
    </>
  );
}
