import { useEffect, useState } from "react";
import "./phone-list-page.scss";
import PhoneCard from "../../ui/phone-card/phone-card";
import { getProducts } from "../../data-access/catalog-api";
import { toPhoneCardViewModel } from "./phone-list.mapper";
import { Link } from "react-router-dom";
import type { PhoneListItemViewModel } from "./phone-list.viewmodel";

export default function PhoneListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<PhoneListItemViewModel[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProducts({ limit: 20, search: searchValue.trim() }).then((response) =>
        setProducts(response.map((item) => toPhoneCardViewModel(item))),
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const resultsCount = products.length;

  return (
    <div className="phone-list">
      <div className="searcher">
        <input
          className="searcher__field"
          name="phone-searcher"
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search for a smartphone..."
        />
        <span className="searcher__count">{resultsCount} RESULTS</span>
      </div>
      <div className="phone-list__content">
        {products.map((phone, index) => (
          <Link to={`/phones/${phone.id}`} key={phone.id + index}>
            <PhoneCard {...phone.card}></PhoneCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
