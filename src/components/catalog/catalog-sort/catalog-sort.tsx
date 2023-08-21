import SortByOrder from '../../sort/sort-by-order/sort-by-order';
import SortByType from '../../sort/sort-by-type/sort-by-type';

export default function CatalogSort(): JSX.Element {
  return (
    <div className="catalog-sort" data-testid='catalog-sort'>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <SortByType />
          <SortByOrder />
        </div>
      </form>
    </div>
  );
}
