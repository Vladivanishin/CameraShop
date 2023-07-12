import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalSuccess } from '../../store/catalog-process/catalog-process';
import {getModalSuccess } from '../../store/catalog-process/selectors';
import Modal from '../modal/modal';

export default function ModalSuccess() : JSX.Element {
  const dispatch = useAppDispatch();
  const isModalSuccess = useAppSelector(getModalSuccess);

  const handleCloseSuccessModal = () => {
    dispatch(modalSuccess(!isModalSuccess));
  };

  return(
    <Modal isOpen={isModalSuccess} onClose={handleCloseSuccessModal}>
      <>
        <p className="title title--h4">Спасибо за отзыв</p>
        <svg className="modal__icon" width="80" height="78" aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg>
        <div className="modal__buttons">
          <button className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => handleCloseSuccessModal()}
            tabIndex={1}
          >Вернуться к покупкам
          </button>
        </div>
        <button className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={() => handleCloseSuccessModal()}
          tabIndex={1}
          data-testid='button'
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </>
    </Modal>
  );
}
