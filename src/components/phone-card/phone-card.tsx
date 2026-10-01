import "./phone-card.scss";
import type { PhoneCardProps } from "./phone-card.types";

export default function PhoneCard({
  imageUrl,
  brand,
  labels,
  price,
}: PhoneCardProps) {
  return (
    <div className={"phone-card phone-card--column"}>
      <img className="phone-card__image" src={imageUrl} alt={brand}></img>
      <div className="phone-card__info">
        <div className="phone-card__detail">
          {brand && <span className="phone-card__detail--small">{brand}</span>}

          {labels &&
            labels.map((label, index) => (
              <span key={label + index} className="phone-card__detail--medium">
                {label}
              </span>
            ))}
        </div>
        <span className="phone-card__price">{price}</span>
      </div>
    </div>
  );
}
