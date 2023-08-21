import { useEffect, useMemo } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGINATION_PAGE } from '../../conts';
import clsx from 'clsx';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage > pageCount) {
      navigate(generatePath(AppRoute.CatalogPage, { page: `?page_${pageCount}` }));
    }
  });

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {currentPage !== DEFAULT_PAGINATION_PAGE &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: `?page_${currentPage - 1}` })}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Назад
            </Link>
          </li>}
        {useMemo(()=> (Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              className={clsx('pagination__link', page === currentPage && 'pagination__link--active')}
              to={generatePath(AppRoute.CatalogPage, { page: `?page_${page}` })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))),[currentPage, pageCount])}
        {currentPage !== pageCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: `?page_${currentPage + 1}` })}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
