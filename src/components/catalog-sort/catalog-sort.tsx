import { SortOrder, SortType } from '../../conts';
import { Camera } from '../../types/catalog';
import { PaginateCatalog } from '../paginate-catalog/paginate-catalog';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSortOrder, selectSortType } from '../../store/catalog-process/catalog-process';
import { getSelectedSortOrder, getSelectedSortType } from '../../store/catalog-process/selectors';

type CatalogSortProps = {
  cameras: Camera[];
}

function CatalogSort({cameras}: CatalogSortProps) : JSX.Element{
  const currentSortType = useAppSelector(getSelectedSortType);
  const currentSortOrder = useAppSelector(getSelectedSortOrder);

  const dispatch = useAppDispatch();

  const handleSortTypeClick = (text: SortType) => {
    dispatch(selectSortType(text));
  };

  const handleSortOrderClick = (text: SortOrder) => {
    dispatch(selectSortOrder(text));
  };

  return(
    <div className="catalog__content">
      <div className="catalog-sort" data-testid="catalog-sort">
        <form action="#">
          <div className="catalog-sort__inner">
            <p className="title title--h5">Сортировать:</p>
            <div className="catalog-sort__type">
              {Object.entries(SortType).map(([type, text]) => (
                <Link
                  className="catalog-sort__btn-text"
                  key={type}
                  onClick={() => handleSortTypeClick(text)}
                  to={`?sortType=${type.toLowerCase()}`}
                >
                  <input
                    type="radio"
                    id={type}
                    name="sort"
                    checked={text === currentSortType}
                    readOnly
                  />
                  <label htmlFor={type}>{text}</label>
                </Link>
              ))}
            </div>
            <div className="catalog-sort__order">
              {Object.entries(SortOrder).map(([type, text]) => (
                <Link
                  className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`}
                  key={type}
                  onClick={() => handleSortOrderClick(text)}
                  to={`?sortOrder=${type.toLowerCase()}`}
                >
                  <input
                    type="radio"
                    id={type}
                    name="sort-icon"
                    readOnly
                    aria-label={text}
                    checked={text === currentSortOrder}
                  />
                  <label htmlFor={type}>
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-sort"></use>
                    </svg>
                  </label>
                </Link>
              ))}
            </div>
          </div>
        </form>
      </div>
      <PaginateCatalog cameras={cameras}/>
    </div>
  );
}

export default CatalogSort;
