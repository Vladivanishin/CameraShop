import { Link } from 'react-router-dom';
import { DEFAULT_PAGINATION_PAGE, SortType } from '../../../conts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectSortType, setCurrentPage } from '../../../store/catalog-process/catalog-process';
import { getSelectedSortType } from '../../../store/catalog-process/selectors';

export default function SortByType(): JSX.Element {
  const currentSortType = useAppSelector(getSelectedSortType);

  const dispatch = useAppDispatch();

  const handleClick = (text: SortType) => {
    dispatch(selectSortType(text));
    dispatch(setCurrentPage(DEFAULT_PAGINATION_PAGE));
  };

  return (
    <div className="catalog-sort__type" data-testid="sort-by-type">
      {Object.entries(SortType).map(([type, text]) => (
        <Link
          className="catalog-sort__btn-text"
          key={type}
          onClick={() => handleClick(text)}
          to={`?sortBy=${text}`}
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
  );
}
