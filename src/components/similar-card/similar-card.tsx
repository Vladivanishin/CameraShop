import { Link, generatePath } from 'react-router-dom';
import { Camera, Review } from '../../types/catalog';
import { AppRoute } from '../../conts';
import { modalBuy, selectProduct } from '../../store/catalog-process/catalog-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getModalBuyStatus } from '../../store/catalog-process/selectors';
import { formatPrice, getRating, handleScrollTopClick } from '../../utils';
import LoadingPage from '../../pages/loading-page/loading-page';

type SimilarCardProps = {
  camera : Camera;
}

export default function SimilarCard({camera}: SimilarCardProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getModalBuyStatus);

  if(camera.reviews === undefined){
    return <LoadingPage></LoadingPage>;
  }
  const rating = getRating(camera.reviews as Review[]);

  const handleBuyClick = () => {
    dispatch(selectProduct(camera));
    dispatch(modalBuy(!isActive));
  };
  const handleMoreClick = () => {
    dispatch(selectProduct(camera));
    handleScrollTopClick();
  };

  return(
    <>
      <div className="product-card__img" >
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info" data-testid="similar-card">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={`${rating !== 0 ? '#icon-full-star' : '#icon-star'}`}></use>
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
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, { id: `${camera.id}`})} onClick={() => handleMoreClick()}>Подробнее
        </Link>
      </div>
    </>
  );
}
