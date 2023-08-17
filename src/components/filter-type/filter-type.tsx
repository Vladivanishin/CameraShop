import { CameraCategory, CameraType } from '../../conts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeType } from '../../store/filters-process/filters-process';
import { getCurrentCategory, getCurrentTypes } from '../../store/filters-process/selectors';

export default function FilterType(): JSX.Element {
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentCategory = useAppSelector(getCurrentCategory);

  const isVideocamera = currentCategory === CameraCategory.Video;

  const dispatch = useAppDispatch();

  const handleCnange = (type: CameraType) => {
    dispatch(changeType(type));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-type">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(CameraType).map((type) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input
              type="checkbox"
              name="digital"
              checked={currentTypes.includes(type)}
              onChange={() => handleCnange(type)}
              disabled={isVideocamera && (type === CameraType.Momental || type === CameraType.OldFilm)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}
