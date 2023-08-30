import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getFilteredCameras } from '../../../store/catalog-process/selectors';
import { getCurrentMaxPrice, getCurrentMinPrice } from '../../../store/filters-process/selectors';
import { getPrice } from '../../../utils';
import { setMaxPrice, setMinPrice } from '../../../store/filters-process/filters-process';
import { KeyCode } from '../../../conts';

type FilterByPriceProps = {
  isReset: boolean;
};

export default function FilterPrice({ isReset }: FilterByPriceProps): JSX.Element {
  const cameras = useAppSelector(getFilteredCameras);
  const dispatch = useAppDispatch();

  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);

  const minPrice = getPrice(cameras, 'min');
  const maxPrice = getPrice(cameras, 'max');

  const [minPriceValue, setMinPriceValue] = useState(currentMinPrice || 0);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  useEffect(() => {
    if (isReset) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [isReset]);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setMinPriceValue(+value);
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setMaxPriceValue(+value);
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      handleMinPriceBlur();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      handleMaxPriceBlur();
    }
  };

  const handleMinPriceBlur = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));

      return;
    }

    if (minPriceValue < +minPrice) {
      setMinPriceValue(+minPrice);
      dispatch(setMinPrice(+minPrice));

      return;
    }

    if (minPriceValue > +maxPrice) {
      setMinPriceValue(+maxPrice);
      dispatch(setMinPrice(+maxPrice));

      return;
    }

    dispatch(setMinPrice(minPriceValue));
  };

  const handleMaxPriceBlur = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));

      return;
    }

    if (maxPriceValue > +maxPrice) {
      setMaxPriceValue(+maxPrice);
      dispatch(setMaxPrice(+maxPrice));

      return;
    }

    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));

      return;
    }

    dispatch(setMaxPrice(maxPriceValue));
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="filter-price">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={minPrice}
              onChange={handleMinPriceInputChange}
              onBlur={handleMinPriceBlur}
              value={minPriceValue || ''}
              onKeyDown={handleMinPriceKeyDown}
              pattern="[0-9]*"
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={maxPrice}
              onChange={handleMaxPriceInputChange}
              onBlur={handleMaxPriceBlur}
              value={maxPriceValue || ''}
              onKeyDown={handleMaxPriceKeyDown}
              pattern="[0-9]*"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
