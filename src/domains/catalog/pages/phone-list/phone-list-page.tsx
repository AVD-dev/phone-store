import { use, useState } from "react";
import "./phone-list-page.scss";
import PhoneCard from "../../../../components/phone-card/phone-card";
import { Link } from "react-router-dom";
import Button from "../../../../components/button/button";
import { useDebouncedValue } from "../../hooks/use-debounced";
import { getProductSummarySuspense } from "../../data-access/catalog-api";
import { toPhoneCardViewModel } from "../../view-models/phone-card/phone-card.mapper";

export default function PhoneListPage() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebouncedValue<string>(searchValue, 300);

  const products = use(
    getProductSummarySuspense({
      limit: 20,
      search: debouncedSearchValue.trim(),
    }),
  );

  const uniqueProducts = Array.from(
    new Map(products.map((item) => [item.id, item])).values(),
  );

  const phones = uniqueProducts.map(toPhoneCardViewModel);

  const resultsCount = phones.length;

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
        {!!searchValue && (
          <Button
            className="searcher__clear"
            variant="ghost"
            label="X"
            onClick={() => setSearchValue("")}
          ></Button>
        )}
        <span className="searcher__count">{resultsCount} RESULTS</span>
      </div>
      <div className="phone-list__content">
        {phones.map((phone) => (
          <Link to={`/phones/${phone.id}`} key={phone.id} viewTransition>
            <PhoneCard {...phone}></PhoneCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
