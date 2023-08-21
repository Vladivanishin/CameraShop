import { Link } from 'react-router-dom';
import { SortOrder, sortOrderQueryValue } from '../../../conts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectSortOrder } from '../../../store/catalog-process/catalog-process';
import { getSelectedSortOrder } from '../../../store/catalog-process/selectors';


export default function SortByOrder(): JSX.Element {
  const currentSortOrder = useAppSelector(getSelectedSortOrder);

  const dispatch = useAppDispatch();

  const handleClick = (text: SortOrder) => {
    dispatch(selectSortOrder(text));
  };

  return (
    <div className="catalog-sort__order" data-testid="sort-by-order">
      {Object.entries(SortOrder).map(([type, text]) => (
        <Link
          className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`}
          key={type}
          onClick={() => handleClick(text)}
          to={`?order=${sortOrderQueryValue[text]}`}
        >
          <input
            type="radio"
            id={type}
            name="sort-icon"
            aria-label={text}
            checked={text === currentSortOrder}
            readOnly
          />
          <label htmlFor={type}>
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#icon-sort"></use>
            </svg>
          </label>
        </Link>
      ))}
    </div>
  );
}
