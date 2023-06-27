import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalReview } from '../../store/catalog-process/catalog-process';
import { getModalReviewStatus, getSelectedProduct } from '../../store/catalog-process/selectors';
import { ReviewRequest } from '../../types/catalog';
import LoadingPage from '../../pages/loading-page/loading-page';
import { fetchPostReviewAction } from '../../store/api-actions';

export default function ModalFeedback() : JSX.Element{
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isModalReview = useAppSelector(getModalReviewStatus);
  const currentProduct = useAppSelector(getSelectedProduct);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating : number) => {
    setRating(newRating);
  };

  if(!currentProduct){
    return <LoadingPage />;
  }

  const onClose = () => {
    dispatch(modalReview(!isModalReview));
  };

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleOverlayClick = (evt: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && !modalRef.current.contains(evt.target as Node)) {
        dispatch(modalReview(!isModalReview));
      }
    };
    const handleClose = (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (evt.key === 'Escape') {
        dispatch(modalReview(!isModalReview));
      }
    };
    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleClose);
    };
  },[dispatch, isModalReview, modalRef]);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" name="rate" type="radio" value='5' onClick={() => handleRatingChange(5)}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" name="rate" type="radio" value='4' onClick={() => handleRatingChange(4)}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" name="rate" type="radio" value='3' onClick={() => handleRatingChange(3)}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" name="rate" type="radio" value='2' onClick={() => handleRatingChange(2)}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" name="rate" type="radio" value='1' onClick={() => handleRatingChange(1)}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
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
        </div>
      </div>
    </div>
  );
}
