import { useEffect, useState } from "react";
import "./phone-list-page.scss";
import PhoneCard from "../../ui/phone-card/phone-card";
import { getProducts } from "../../data-access/catalog-api";
import { toPhoneCardViewModel } from "./phone-list.mapper";
import { Link } from "react-router-dom";
import type { PhoneListItemViewModel } from "./phone-list.viewmodel";
import type { ProductSummaryDto } from "../../data-access/product-summary.dto";
import Button from "../../../../components/button/button";

export default function PhoneListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<PhoneListItemViewModel[]>([]);

  const handlerProducts = (products: ProductSummaryDto[]): void => {
    const uniqueProducts = Array.from(
      new Map(products.map((item) => [item.id, item])).values(),
    );

    setProducts(uniqueProducts.map((item) => toPhoneCardViewModel(item)));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProducts({ limit: 20, search: searchValue.trim() }).then(
        handlerProducts,
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
        {products.map((phone) => (
          <Link to={`/phones/${phone.id}`} key={phone.id}>
            <PhoneCard {...phone.card}></PhoneCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
