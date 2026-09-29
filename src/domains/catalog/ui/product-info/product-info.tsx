import { useState } from "react";
import SelectColor from "../../../ui/color-selector/color-selector";
import "./product-info.scss";
import Button from "../../../ui/button/button";
import type { ProductInfoProps } from "./product-info.types";

export default function ProductInfo({
  imageUrl,
  name,
  basePrice,
  storageOptions,
  colors,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedStoragePrice, setSelectedStoragePrice] = useState<number>();

  const priceLabel = selectedStoragePrice
    ? `${selectedStoragePrice} EUR`
    : `From ${basePrice} EUR`;

  return (
    <>
      <div className="product-info">
        <img width="273px" height="260px" src={imageUrl}></img>

        <div className="product-title">
          <span className="product-title__name">{name}</span>
          <span className="product-info--medium">{priceLabel}</span>
        </div>

        <div>
          <span className="product-info--small">
            STORAGE: ¿HOW MUCH SPACE DO YOU NEED?
          </span>
          <div className="product-selector">
            {storageOptions &&
              storageOptions.map((option) => (
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

          {colors && (
            <div className="product-color">
              <span className="product-info--small">
                COLOR: PICK YOUR FAVORITE.
              </span>
              <SelectColor
                colors={colors}
                selectedColor={selectedColor}
                onChange={setSelectedColor}
              ></SelectColor>
            </div>
          )}
        </div>

        <Button label="AÑADIR"></Button>
      </div>
    </>
  );
}
