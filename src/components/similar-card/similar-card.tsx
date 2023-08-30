import { Link, generatePath } from 'react-router-dom';
import { Camera, Review } from '../../types/catalog';
import { AppRoute, NONE_RATING, STARS_ARRAY_RATING } from '../../conts';
import { modalBuy, selectProduct } from '../../store/catalog-process/catalog-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getModalBuyStatus } from '../../store/catalog-process/selectors';
import { formatPrice, getRating, handleScrollTopClick } from '../../utils';
import { getBasketCameras } from '../../store/basket-process/selectors';

type SimilarCardProps = {
  camera : Camera;
}

export default function SimilarCard({camera}: SimilarCardProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getModalBuyStatus);
  const basketCameras = useAppSelector(getBasketCameras);

  const rating = camera.reviews ? getRating(camera.reviews as Review[]) : NONE_RATING;

  const handleBuyClick = () => {
    dispatch(selectProduct(camera));
    dispatch(modalBuy(!isActive));
  };
  const handleMoreClick = () => {
    dispatch(selectProduct(camera));
    handleScrollTopClick();
  };

  const isOnBasket = basketCameras.find((item) => item.id === camera.id);

  return(
    <>
      <div className="product-card__img" >
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info" data-testid="similar-card">
        <div className="rate product-card__rate">
          {Array.from(STARS_ARRAY_RATING).map((star) => (
            <svg
              key={star}
              width="17"
              height="16"
              aria-hidden="true"
              className={rating >= star ? 'full-star' : 'empty-star'}
            >
              <use xlinkHref={`#icon-${rating >= star ? 'full-star' : 'star'}`}></use>
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isOnBasket ? <button className="btn btn--purple-border"><svg width="16" height="16" aria-hidden="true"><use xlinkHref="#icon-basket"></use></svg>В корзине</button> : <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleBuyClick()}>Купить</button>}
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, { id: `${camera.id}`})} onClick={() => handleMoreClick()}>Подробнее
        </Link>
      </div>
    </>
  );
}
