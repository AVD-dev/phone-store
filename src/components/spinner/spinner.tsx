import "./spinner.scss";

export default function Spinner() {
  console.log("loading");
  return (
    <div className="spinner-wrapper">
      <div className="spinner-bounce">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
