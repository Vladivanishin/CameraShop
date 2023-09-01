import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getErrorBasketStatus } from '../../../store/basket-process/selectors';
import { fetchPostCouponAction } from '../../../store/api-actions';
import clsx from 'clsx';
import { setCoupon, setErrorStatus } from '../../../store/basket-process/basket-process';
import { useEffect } from 'react';


type PromoFormField = {
  promo: string;
};

export default function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();
  const isErrorPromo = useAppSelector(getErrorBasketStatus);

  useEffect(() => {
    dispatch(setErrorStatus(null));
  },[]);

  const {
    register,
    handleSubmit,
  } = useForm<PromoFormField>({
    mode: 'onSubmit'
  });

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
          <div className={clsx('custom-input', isErrorPromo === true && 'is-invalid', isErrorPromo === false && 'is-valid')}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                {...register('promo', {
                  validate: {
                    positive: (value) => {
                      if (value){
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
                defaultValue={''}
                placeholder="Введите промокод"
              />
            </label>
            {isErrorPromo === true && <p className="custom-input__error">Промокод неверный</p>}
            {isErrorPromo === false && <p className="custom-input__success">Промокод принят!</p>}
          </div>
          <button className="btn" type="submit">
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}
