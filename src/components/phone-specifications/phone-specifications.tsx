import type { PhoneSpecificationsProps } from "./phone-specifications.types";
import "./phone-specifications.scss";

export default function PhoneSpecifications(props: PhoneSpecificationsProps) {
  return (
    <div className="specifications">
      <span className="specifications__title">SPECIFICATIONS</span>

      <div className="specifications__row">
        <span className="specifications__row--field-size">BRAND</span>
        <span>{props.brand}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">NAME</span>
        <span>{props.name}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">DESCRIPTION</span>
        <span>{props.description}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">SCREEN</span>
        <span>{props.screen}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">RESOLUTION</span>
        <span>{props.resolution}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">PROCESSOR</span>
        <span>{props.processor}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">MAIN CAMERA</span>
        <span>{props.mainCamera}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">SELFIE CAMERA</span>
        <span>{props.selfieCamera}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">BATTERY</span>
        <span>{props.battery}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">OS</span>
        <span>{props.os}</span>
      </div>
      <div className="specifications__row">
        <span className="specifications__row--field-size">
          SCREEN REFRESH RATE
        </span>
        <span>{props.screenRefreshRate}</span>
      </div>
    </div>
  );
}
