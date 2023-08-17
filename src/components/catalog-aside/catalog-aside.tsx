
import Filters from '../filters/filters';

export default function CatalogAside(): JSX.Element {
  return (
    <div className="catalog__aside" data-testid="catalog-aside">
      <div className="catalog-filter">
        <Filters />
      </div>
    </div>
  );
}
