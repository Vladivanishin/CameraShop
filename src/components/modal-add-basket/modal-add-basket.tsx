import { useAppSelector } from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page';
import { getSelectedProduct } from '../../store/catalog-process/selectors';
import { formatPrice } from '../../utils';

type ModalAddBasketProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAddBasket({isOpen, onClose}: ModalAddBasketProps) : JSX.Element {
  const selectedProduct = useAppSelector(getSelectedProduct);

  if(!selectedProduct){
    return <LoadingPage />;
  }

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${selectedProduct?.previewImgWebp}, ${selectedProduct?.previewImgWebp2x} 2x`} /><img src={`${selectedProduct?.previewImg}`} srcSet={`${selectedProduct?.previewImg2x} 2x`} width="140" height="120" alt={`${selectedProduct?.name}`} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{selectedProduct?.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{selectedProduct?.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{selectedProduct?.category}</li>
            <li className="basket-item__list-item">{selectedProduct?.level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(selectedProduct?.price)} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClose()}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
