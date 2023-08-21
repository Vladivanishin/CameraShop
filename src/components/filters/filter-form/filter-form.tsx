import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { resetFilters } from '../../../store/filters-process/filters-process';
import FilterPrice from '../filters-price/filter-price';
import FilterCategory from '../filter-category/filter-category';
import FilterType from '../filter-type/filter-type';
import FilterLevel from '../filter-level/filter-level';

export default function FilterForm(): JSX.Element {
  const [isReset, setIsReset] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsReset(true);
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <form data-testid="filter-form" onSubmit={(evt) => { evt.preventDefault(); }} >
      <h2 className="visually-hidden">Фильтр</h2>
      <FilterPrice isReset={isReset} />
      <FilterCategory />
      <FilterType />
      <FilterLevel />
      <button
        className="btn catalog-filter__reset-btn"
        type="reset"
        onClick={handleClick}
      >
        Сбросить фильтры
      </button>
    </form>
  );
}
