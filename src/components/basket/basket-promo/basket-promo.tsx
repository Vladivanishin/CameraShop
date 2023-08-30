import { SubmitHandler, useForm } from 'react-hook-form';
import { Coupon } from '../../../conts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCoupon } from '../../../store/basket-process/selectors';
import { fetchPostCouponAction } from '../../../store/api-actions';
import clsx from 'clsx';
import { setCoupon } from '../../../store/basket-process/basket-process';


type PromoFormField = {
  promo: Coupon;
};

export default function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<PromoFormField>({
    mode: 'onSubmit'
  });
  const coupon = useAppSelector(getCoupon);

  const onSubmit: SubmitHandler<PromoFormField> = (data) => {

    dispatch(fetchPostCouponAction(data.promo));
  };

  return (
    <div className="basket__promo" data-testid='basket-promo'>
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={clsx('custom-input', errors.promo && 'is-invalid', isValid && 'is-valid')}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                {...register('promo', {
                  validate: {
                    positive: (value) => {

                      if (value === Coupon.First || value === Coupon.Second || value === Coupon.Third){
                        dispatch(setCoupon(value));
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                })}
                type="text"
                name="promo"
                defaultValue={coupon || ''}
                placeholder="Введите промокод"
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}
