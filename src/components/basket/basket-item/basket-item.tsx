import { ChangeEvent } from 'react';
import { Camera } from '../../../types/catalog';
import { formatPrice, getTotalProductPrice } from '../../../utils';
import { MAX_PRODUCT_COUNT, MIN_PRODUCT_COUNT } from '../../../conts';
import { useAppDispatch } from '../../../hooks';
import { addBasketCamera, decrementCameraCount, setCameraCount } from '../../../store/basket-process/basket-process';
import { selectProduct, setModalRemove } from '../../../store/catalog-process/catalog-process';

type BasketItemProps = {
  camera: Camera;
}

export default function BasketItem({camera}: BasketItemProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value > MAX_PRODUCT_COUNT) {
      dispatch(setCameraCount({ id: camera.id, count: MAX_PRODUCT_COUNT }));

      return;
    }

    dispatch(setCameraCount({ id: camera.id, count: Math.round(+value) }));
  };

  const handleBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value < MIN_PRODUCT_COUNT) {
      dispatch(setCameraCount({ id: camera.id, count: MIN_PRODUCT_COUNT }));
    }
  };

  const handleDeleteClick = () => {
    if (setModalRemove && selectProduct) {
      dispatch(selectProduct(camera));
      dispatch(setModalRemove(true));
    }
  };

  const handleIncrementClick = () => {
    dispatch(addBasketCamera(camera));
  };

  const handleDecrementClick = () => {

    dispatch(decrementCameraCount(camera));
  };

  return(
    <li className="basket-item" data-testid='basket-item'>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x}`}
          />
          <img
            src={`${camera.previewImg}`}
            srcSet={`${camera.previewImg2x} 2x`}
            width="140" height="120"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} {camera.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={camera.count === MIN_PRODUCT_COUNT}
          onClick={handleDecrementClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={camera.count || ''}
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={camera.count === MAX_PRODUCT_COUNT}
          onClick={handleIncrementClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getTotalProductPrice(camera.price, camera.count!)} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleDeleteClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
