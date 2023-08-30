import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getModalSuccessOrder } from '../../../store/catalog-process/selectors';
import Modal from '../modal/modal';
import { setModalSuccessOrder } from '../../../store/catalog-process/catalog-process';
import { resetBasket } from '../../../store/basket-process/basket-process';

export default function ModalSuccessOrder() : JSX.Element {
  const dispatch = useAppDispatch();
  const isModalSuccessOrder = useAppSelector(getModalSuccessOrder);

  const handleCloseSuccessModal = () => {
    dispatch(setModalSuccessOrder(!isModalSuccessOrder));
    dispatch(resetBasket());
  };

  return(
    <Modal isOpen={isModalSuccessOrder} onClose={handleCloseSuccessModal}>
      <>
        <p className="title title--h4">Спасибо за покупку</p>
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
