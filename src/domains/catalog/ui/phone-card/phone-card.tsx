import "./phone-card.scss";
import type { PhoneCardProps } from "./phone-card.types";

export default function PhoneCard({
  imageUrl,
  brand,
  labels,
  price,
  orientation = "column",
}: PhoneCardProps) {
  return (
    <div
      className={
        orientation === "column"
          ? "phone-card phone-card--column"
          : "phone-card phone-card--row"
      }
    >
      <img className="phone-card__image" src={imageUrl}></img>
      <div className="phone-card__info">
        <div className="phone-card__detail">
          {brand && <span className="phone-card__detail--small">{brand}</span>}

          {labels &&
            labels.map((label) => (
              <span className="phone-card__detail--medium">{label}</span>
            ))}
        </div>
        <span className="phone-card__price">{price}</span>
      </div>
    </div>
  );
}
