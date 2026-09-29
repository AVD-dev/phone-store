import { useEffect, useState } from "react";
import "./phone-list-page.scss";
import PhoneCard from "../../ui/phone-card/phone-card";
import { getProducts } from "../../data-access/catalog-api";
import type { ProductSummaryDto } from "../../data-access/product-summary.dto";
import { toPhoneCardViewModel } from "./phone-list.mapper";

export default function PhoneListPage() {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState<ProductSummaryDto[]>([]);

  const phones = products.map(toPhoneCardViewModel);

  useEffect(() => {
    getProducts({ limit: 20 }).then(setProducts);
  }, []);

  return (
    <div className="phone-list">
      <div className="searcher">
        <input
          className="searcher__field"
          name="phone-searcher"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search for a smartphone..."
        />
        <span className="searcher__count">20 RESULTS</span>
      </div>
      <div className="phone-list__content">
        {phones.map((phone) => (
          <PhoneCard phoneData={phone}></PhoneCard>
        ))}
      </div>
    </div>
  );
}
