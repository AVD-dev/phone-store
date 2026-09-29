import "./phone-card.scss";
import type { PhoneCardProps } from "./phone-card.viewmodel";

export default function PhoneCard({ phoneData }: PhoneCardProps) {
  return (
    <div
      className={
        phoneData.orientation === "column"
          ? "phone-card phone-card--column"
          : "phone-card--row"
      }
    >
      <img className="phone-card__image" src={phoneData.imageUrl}></img>
      <div className="phone-card__info">
        <div className="phone-card__detail">
          {phoneData.brand && (
            <span className="phone-card__detail--small">{phoneData.brand}</span>
          )}

          {phoneData.labels &&
            phoneData.labels.map((label) => (
              <span className="phone-card__detail--medium">{label}</span>
            ))}
        </div>
        <span className="phone-card__price">{phoneData.price}</span>
      </div>
    </div>
  );
}
