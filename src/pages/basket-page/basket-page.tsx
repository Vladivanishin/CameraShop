import BasketList from '../../components/basket/basket-list/basket-list';
import BasketOrder from '../../components/basket/basket-order/basket-order';
import BasketPromo from '../../components/basket/basket-promo/basket-promo';
import BreadcrumbsBasket from '../../components/breadcrumbs/breadcrumbs-basket/breadcrumbs-basket';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalRemoveItem from '../../components/modals/modal-remove-item.tsx/modal-remove-item';
import ModalSuccessOrder from '../../components/modals/modal-success-order/modal-success-order';
import { useAppSelector } from '../../hooks';
import { getModalRemoveStatus, getModalSuccessOrder } from '../../store/catalog-process/selectors';

export default function BasketPage ():JSX.Element{
  const isModalRemove = useAppSelector(getModalRemoveStatus);
  const body = document.querySelector('body');
  const isModalSuccessOrder = useAppSelector(getModalSuccessOrder);

  if(isModalRemove === true || isModalSuccessOrder === true){
    body?.classList.add('scroll-lock');
  } else {
    body?.classList.remove('scroll-lock');
  }
  return(
    <div className="wrapper" data-testid='basket-testid'>
      <Header />
      <main>
        <div className="page-content">
          <BreadcrumbsBasket />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList />
              <div className="basket__summary">
                <BasketPromo />
                <BasketOrder />
              </div>
            </div>
          </section>
        </div>
        {isModalRemove && <ModalRemoveItem />}
        {isModalSuccessOrder && <ModalSuccessOrder />}
      </main>
      <Footer />
    </div>
  );
}
