import { CameraCategory, DEFAULT_PAGINATION_PAGE } from '../../../conts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentPage } from '../../../store/catalog-process/catalog-process';
import { changeCategory } from '../../../store/filters-process/filters-process';
import { getCurrentCategory } from '../../../store/filters-process/selectors';

export default function FilterCategory(): JSX.Element {
  const currentCategory = useAppSelector(getCurrentCategory);

  const dispatch = useAppDispatch();

  const handleCnange = (category: CameraCategory) => {
    if (currentCategory === category) {
      dispatch(changeCategory(null));

      return;
    }

    dispatch(changeCategory(category));
    dispatch(setCurrentPage(DEFAULT_PAGINATION_PAGE));
  };


  return (
    <fieldset className="catalog-filter__block" data-testid="filter-category">
      <legend className="title title--h5">Категория</legend>
      {Object.values(CameraCategory).map((category) => (
        <div className="custom-checkbox catalog-filter__item" key={category}>
          <label>
            <input
              type="checkbox"
              name="photocamera"
              checked={currentCategory === category}
              onChange={() => handleCnange(category)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{category === CameraCategory.Photo ? 'Фотокамера' : category}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}
