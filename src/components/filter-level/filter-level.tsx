import { CameraLevel } from '../../conts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLevel } from '../../store/filters-process/filters-process';
import { getCurrentLevels } from '../../store/filters-process/selectors';

export default function FilterLevel(): JSX.Element {
  const currentLevels = useAppSelector(getCurrentLevels);

  const dispatch = useAppDispatch();

  const handleCnange = (level: CameraLevel) => {
    dispatch(changeLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-level">
      <legend className="title title--h5">Уровень</legend>
      {Object.values(CameraLevel).map((level) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input
              type="checkbox"
              name="zero"
              checked={currentLevels.includes(level)}
              onChange={() => handleCnange(level)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}
