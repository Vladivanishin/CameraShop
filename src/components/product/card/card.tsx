import { Link, generatePath } from 'react-router-dom';
import { Camera } from '../../../types/catalog';
import { AppRoute, NONE_RATING } from '../../../conts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { modalBuy, selectProduct } from '../../../store/catalog-process/catalog-process';
import { getModalBuyStatus } from '../../../store/catalog-process/selectors';
import { formatPrice } from '../../../utils';

type CardProps = {
  camera: Camera;
}

export default function Card ({camera}: CardProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getModalBuyStatus);
  const rating = camera.rating;

  const handleBuyClick = () => {
    dispatch(selectProduct(camera));
    dispatch(modalBuy(!isActive));
  };
  const handleMoreClick = () => {
    dispatch(selectProduct(camera));
  };

  return(
    <div className="product-card" data-testid="card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating !== NONE_RATING ? '#icon-full-star' : '#icon-star'}`}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating === 2 || rating === 3 || rating === 4 || rating === 5 ? '#icon-full-star' : '#icon-star'}`}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating === 3 || rating === 4 || rating === 5 ? '#icon-full-star' : '#icon-star'}`}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating === 4 || rating === 5 ? '#icon-full-star' : '#icon-star'}`}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating === 5 ? '#icon-full-star' : '#icon-star'}`}></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleBuyClick()}>Купить
        </button>
        <Link className="btn btn--transparent"
          onClick={() => handleMoreClick()}
          to={generatePath(AppRoute.Product, { id: `${camera.id}`})}
        >Подробнее
        </Link>
      </div>
    </div>
  );
}
