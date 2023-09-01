import { useAppDispatch, useAppSelector } from '../../../hooks';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../conts';
import { getModalProductAddedStatus } from '../../../store/catalog-process/selectors';
import { setModalProductAdded } from '../../../store/catalog-process/catalog-process';

export default function ModalProductAdded() : JSX.Element {
  const dispatch = useAppDispatch();
  const isModalProductAdded = useAppSelector(getModalProductAddedStatus);

  const handleCloseSuccessModal = () => {
    dispatch(setModalProductAdded(!isModalProductAdded));
  };

  return(
    <Modal isOpen={isModalProductAdded} onClose={handleCloseSuccessModal}>
      <div style={{width: 240}}>
        <p className="title title--h4">Товар успешно добавлен в корзину</p>
        <svg className="modal__icon" width="86" height="80" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <div className="modal__buttons">
          <button
            className="btn btn--transparent modal__btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => handleCloseSuccessModal()}
            tabIndex={1}
            data-testid='button'
          >Продолжить покупки
          </button>
          <Link
            className="btn btn--purple modal__btn modal__btn--fit-width"
            to={AppRoute.Basket}
            onClick={() => handleCloseSuccessModal()}
          >Перейти в корзину
          </Link>
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
      </div>
    </Modal>
  );
}
