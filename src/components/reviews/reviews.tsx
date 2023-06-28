import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviews } from '../../store/product-process/selectors';
import ReviewsList from '../review-list/review-list';
import { useState } from 'react';
import { MAX_REVIEWS_COUNT } from '../../conts';
import { getModalReviewStatus } from '../../store/catalog-process/selectors';
import { modalReview } from '../../store/catalog-process/catalog-process';

export default function Reviews() : JSX.Element{
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();
  const isModalReview = useAppSelector(getModalReviewStatus);
  const [count, setCount] = useState(MAX_REVIEWS_COUNT);
  const sortedReviews = [...reviews].sort((a, b) => dayjs(b.createAt).diff(a.createAt));
  const currentReviews = sortedReviews.slice(0, count);

  return(
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => dispatch(modalReview(!isModalReview))}>Оставить свой отзыв</button>
          </div>
          <ReviewsList reviews={currentReviews}/>
          <div
            className="review-block__buttons"
            onClick={() => setCount((prev) => count + MAX_REVIEWS_COUNT)}
          >
            {reviews.length !== currentReviews.length && (
              <button className="btn btn--purple" type="button">Показать больше отзывов
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
