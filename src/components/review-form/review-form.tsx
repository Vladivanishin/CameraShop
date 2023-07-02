import { FormEvent, Fragment, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedProduct } from '../../store/catalog-process/selectors';
import { fetchPostReviewAction } from '../../store/api-actions';
import { ReviewRequest } from '../../types/catalog';
import LoadingPage from '../../pages/loading-page/loading-page';

type ReviewFormProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewForm ({isOpen, onClose}: ReviewFormProps) : JSX.Element{
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getSelectedProduct);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating : number) => {
    setRating(newRating);
  };

  if(!currentProduct){
    return <LoadingPage />;
  }

  const onSubmit = (review: ReviewRequest) => {
    dispatch(fetchPostReviewAction(review));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (userNameRef.current !== null && advantageRef.current !== null && disadvantageRef.current !== null && reviewRef.current !== null) {
      onSubmit({
        userName: userNameRef.current.value,
        advantage: advantageRef.current.value,
        disadvantage: disadvantageRef.current.value,
        review: reviewRef.current.value,
        rating: rating,
        cameraId: currentProduct.id,
      });
    }
  };

  const ratingProduct: Record<number, string> = {
    5: 'Отлично',
    4: 'Хорошо',
    3: 'Нормально',
    2: 'Плохо',
    1: 'Ужасно'
  };

  return(
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-review__rate">
            <fieldset className={`rate form-review__item ${rating === 0 ? 'is-invalid' : ''}`}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {[5, 4, 3, 2, 1].map((rate) => (
                    <Fragment key={rate}>
                      <input
                        className="visually-hidden"
                        id={`star-${rate}`}
                        name="rate"
                        type="radio"
                        value={rate}
                        onClick={() => handleRatingChange(rate)}
                      />
                      <label
                        className='rate__label'
                        htmlFor={`star-${rate}`}
                        title={`Оценка ${ratingProduct[rate]}`}
                      >
                      </label>
                    </Fragment>
                  ))}
                </div>
                <div className="rate__progress"><span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className={'custom-input form-review__item'}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  name="userName"
                  ref={userNameRef}
                  placeholder="Введите ваше имя"
                  required
                />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  name="user-plus"
                  ref={advantageRef}
                  placeholder="Основные преимущества товара"
                  required
                />
              </label>
              <p className="custom-input__error">Нужно указать достоинства</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text"
                  name="user-minus"
                  ref={disadvantageRef}
                  placeholder="Главные недостатки товара"
                  required
                />
              </label>
              <p className="custom-input__error">Нужно указать недостатки</p>
            </div>
            <div className="custom-textarea form-review__item">
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  name="user-comment"
                  minLength={5}
                  ref={reviewRef}
                  placeholder="Поделитесь своим опытом покупки"
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">Нужно добавить комментарий</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClose()}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
