import "./product-info.scss";
import Button from "../button/button";
import ColorSelector from "../color-selector/color-selector";
import type { ProductInfoProps } from "./product-info.types";

export default function ProductInfo({
  name,
  imageUrl,
  basePrice,
  colors,
  storageOptions,
  selectedColorId,
  selectedStorageId,
  onColorChange,
  onStorageChange,
  onAdd,
}: ProductInfoProps) {
  const selectedColor = colors.find(({ id }) => id === selectedColorId);
  const selectedStorage = storageOptions.find(
    ({ id }) => id === selectedStorageId,
  );

  const displayedImage = selectedColor?.imageUrl ?? imageUrl;
  const priceLabel = selectedStorage?.price ?? basePrice;
  const isDisabled = !selectedColor || !selectedStorage;

  return (
    <div className="info-container">
      <img className="product-image" src={displayedImage} alt={name}></img>
      <div className="product-info">
        <div className="product-title">
          <span className="product-title__name">{name}</span>
          <span className="product-info--medium">{priceLabel}</span>
        </div>

        <div>
          <span className="product-info--small">
            STORAGE: ¿HOW MUCH SPACE DO YOU NEED?
          </span>
          <div className="product-selector">
            {storageOptions.map((option) => (
              <label
                className="product-selector__radio product-info--small"
                key={option.id}
              >
                <input
                  type="radio"
                  name="storage-option"
                  value={option.id}
                  checked={selectedStorageId === option.id}
                  onChange={() => onStorageChange(option.id)}
                ></input>
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <div className="product-color">
            <span className="product-info--small">
              COLOR: PICK YOUR FAVORITE.
            </span>
            <ColorSelector
              colors={colors}
              selectedColor={selectedColorId}
              onChange={(color) => onColorChange(color.id)}
            ></ColorSelector>
          </div>
        </div>

        <Button label="AÑADIR" disabled={isDisabled} onClick={onAdd}></Button>
      </div>
    </div>
  );
}
