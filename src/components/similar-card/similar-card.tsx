import { Link, generatePath } from 'react-router-dom';
import { Camera } from '../../types/catalog';
import { AppRoute } from '../../conts';
import { modalAction, selectProduct } from '../../store/catalog-process/catalog-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getModalStatus } from '../../store/catalog-process/selectors';

type SimilarCardProps = {
  camera : Camera;
}

export default function SimilarCard({camera}: SimilarCardProps) : JSX.Element{
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getModalStatus);
  const handleCardClick = () => {
    dispatch(selectProduct(camera));
    dispatch(modalAction(!isActive));
  };
  return(
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 4</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleCardClick()}>Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, { id: `${camera.id}`})} onClick={() => dispatch(selectProduct(camera))}>Подробнее
        </Link>
      </div>
    </div>
  );
}
