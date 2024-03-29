import { useAppSelector } from '../../../hooks';
import { getCurrentPage, getFilteredCameras } from '../../../store/catalog-process/selectors';
import { DEFAULT_PAGINATION_PAGE, ITEMS_PER_PAGE } from '../../../conts';
import CatalogSort from '../catalog-sort/catalog-sort';
import EmptyList from '../../empty-list/empty-list';
import CardList from '../../product/card-list/card-list';
import Pagination from '../../pagination/pagination';
import CatalogFilters from '../catalog-filters/catalog-filters';

export default function CatalogSection(): JSX.Element {
  const cameras = useAppSelector(getFilteredCameras);
  const currentPage = useAppSelector(getCurrentPage)!;

  const pageCount = Math.ceil(cameras.length / ITEMS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="catalog" data-testid="catalog-section">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilters />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            {!renderedCameras.length ?
              <EmptyList /> :
              <CardList cameras={renderedCameras} />}
            {pageCount > DEFAULT_PAGINATION_PAGE && <Pagination currentPage={currentPage} pageCount={pageCount} />}
          </div>
        </div>
      </div>
    </section>
  );
}
