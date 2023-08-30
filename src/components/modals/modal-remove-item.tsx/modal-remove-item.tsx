import { useAppDispatch, useAppSelector } from '../../../hooks';
import LoadingPage from '../../../pages/loading-page/loading-page';
import { removeCamera } from '../../../store/basket-process/basket-process';
import { setModalRemove } from '../../../store/catalog-process/catalog-process';
import {getModalRemoveStatus, getSelectedProduct } from '../../../store/catalog-process/selectors';
import Modal from '../modal/modal';

export default function ModalRemoveItem() : JSX.Element {
  const dispatch = useAppDispatch();
  const isModalRemove = useAppSelector(getModalRemoveStatus);
  const camera = useAppSelector(getSelectedProduct);

  const handleCloseSuccessModal = () => {
    dispatch(setModalRemove(!isModalRemove));
  };

  if(!camera){
    return <LoadingPage />;
  }

  const handleClick = () => {
    dispatch(removeCamera(camera));
    handleCloseSuccessModal();
  };

  return(
    <Modal isOpen={isModalRemove} onClose={handleCloseSuccessModal}>
      <>
        <p className="title title--h4">Удалить этот товар?</p>
        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x}`}
              />
              <img
                src={`${camera.previewImg}`}
                srcSet={`${camera.previewImg2x} 2x`}
                width="140" height="120"
                alt={camera.name}
              />
            </picture>
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{camera.name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">Артикул:</span>
                <span className="basket-item__number">{camera.vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{camera.type} {camera.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
              <li className="basket-item__list-item">{camera.level} уровень</li>
            </ul>
          </div>
        </div>
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--half-width"
            type="button"
            tabIndex={1}
            onClick={handleClick}
          >Удалить
          </button>
          <button
            className="btn btn--transparent modal__btn modal__btn--half-width"
            tabIndex={1}
            onClick={() => handleCloseSuccessModal()}
          >Продолжить покупки
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
