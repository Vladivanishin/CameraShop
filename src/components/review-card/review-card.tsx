import { STARS_ARRAY_RATING } from '../../conts';
import { ReviewResponse } from '../../types/catalog';
import dayjs from 'dayjs';

type ReviewCardProps = {
  review: ReviewResponse;
}

export default function ReviewCard({review}: ReviewCardProps): JSX.Element{
  require('dayjs/locale/ru');
  const date = review.createAt;
  const formatUserDate = dayjs(date).locale('ru').format('DD MMMM');
  const formatDateTime = dayjs(date).format('YYYY-MM-DD');
  return(
    <li className="review-card" data-testid='review-card'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={formatDateTime}>{formatUserDate}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from(STARS_ARRAY_RATING).map((star) => (
          <svg
            key={star}
            width="17"
            height="16"
            aria-hidden="true"
            className={review.rating >= star ? 'full-star' : 'empty-star'}
          >
            <use xlinkHref={`#icon-${review.rating >= star ? 'full-star' : 'star'}`}></use>
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
