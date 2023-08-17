import { useEffect } from 'react';
import { Link, generatePath, useLocation, useSearchParams } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGINATION_PAGE } from '../../conts';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps): JSX.Element {
  const locationURL = useLocation();
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page'));

  useEffect(() => {
    if (locationURL.search === `?page=${pageNumber}`) {
      onPageChange(pageNumber);
    }
    if(pageNumber > pageCount){
      onPageChange(DEFAULT_PAGINATION_PAGE);
    }
  }, [locationURL.search]);

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGINATION_PAGE &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: `?page=${currentPage - 1}`})}
              onClick={() => onPageChange(currentPage - 1)}
            >Назад
            </Link>
          </li>}
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`}
              to={generatePath(AppRoute.CatalogPage, { page: `?page=${page}`})}
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </Link>
          </li>
        ))}
        {currentPage !== pageCount &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: `?page=${currentPage + 1}`})}
              onClick={() => onPageChange(currentPage + 1)}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
