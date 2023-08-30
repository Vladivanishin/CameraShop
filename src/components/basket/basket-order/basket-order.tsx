import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPostNewOrderAction } from '../../../store/api-actions';
import { getCoupon, getDiscountPercent, getTotalPrice, selectAllBasketProducts } from '../../../store/basket-process/selectors';
import { getDiscount, getFinalPrice } from '../../../utils';

export default function BasketOrder(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketCameras = useAppSelector(selectAllBasketProducts);
  const discountPercent = useAppSelector(getDiscountPercent);
  const currentCoupon = useAppSelector(getCoupon);

  const camerasIds = basketCameras.reduce((acc: number[], camera) => {
    acc.push(camera.id);

    return acc;
  }, []);

  const totalPrice = useAppSelector(getTotalPrice);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);


  const handleClick = () => {
    if(currentCoupon === 0){
      const emptyCoupon = null;
      dispatch(fetchPostNewOrderAction({ camerasIds: camerasIds, coupon: emptyCoupon }));
      return;
    }
    dispatch(fetchPostNewOrderAction({ camerasIds: camerasIds, coupon: currentCoupon }));
  };

  return (
    <div className="basket__summary-order" data-testid="basket-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={clsx('basket__summary-value', discount && 'basket__summary-value--bonus')}>{discount} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span>
      </p>
      <button className="btn btn--purple" onClick={handleClick}>
        Оформить заказ
      </button>
    </div>
  );
}
