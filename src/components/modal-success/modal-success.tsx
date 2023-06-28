import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalSuccess } from '../../store/catalog-process/catalog-process';
import {getModalSuccess } from '../../store/catalog-process/selectors';

export default function ModalSuccess() : JSX.Element {
  const dispatch = useAppDispatch();
  const isModalSuccess = useAppSelector(getModalSuccess);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(modalSuccess(!isModalSuccess));
      }
    };
    const handleOverlayClick = (evt: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(evt.target as Node)) {
        dispatch(modalSuccess(!isModalSuccess));
      }
    };
    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleClose);
    };
  },[dispatch, isModalSuccess, modalRef]);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => dispatch(modalSuccess(!isModalSuccess))} tabIndex={1}>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(modalSuccess(!isModalSuccess))} tabIndex={1}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
