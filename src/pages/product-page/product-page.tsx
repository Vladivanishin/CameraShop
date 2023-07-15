import { Link, useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getModalBuyStatus, getModalReviewStatus, getModalSuccess, getSelectedProduct } from '../../store/catalog-process/selectors';
import LoadingPage from '../loading-page/loading-page';
import { AppRoute, TabsControl } from '../../conts';
import Similar from '../../components/similar/similar';
import { getCurrentTabControl, getReviews, getSimilarCameras } from '../../store/product-process/selectors';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { selectTabsControl } from '../../store/product-process/product-process';
import { formatPrice, handleScrollTopClick } from '../../utils';
import { modalBuy, selectProduct } from '../../store/catalog-process/catalog-process';
import Reviews from '../../components/reviews/reviews';
import ModalSuccess from '../../components/modal-success/modal-success';
import ModalReview from '../../components/modal-review/modal-review';
import ModalBuy from '../../components/modal-buy/modal-buy';

const body = document.querySelector('body');

export default function ProductPage (): JSX.Element{
  const selectedProduct = useAppSelector(getSelectedProduct);
  const similarCameras = useAppSelector(getSimilarCameras);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const cameraId = Number(id);
  const currentTabControl = useAppSelector(getCurrentTabControl);
  const isModalBuy = useAppSelector(getModalBuyStatus);
  const isModalReview = useAppSelector(getModalReviewStatus);
  const isModalSuccess = useAppSelector(getModalSuccess);
  const reviews = useAppSelector(getReviews);
  const locationURL = useLocation();

  useEffect(() => {
    if (locationURL.search === '?specifications') {
      dispatch(selectTabsControl(TabsControl.Specifications));
    } else {
      dispatch(selectTabsControl(TabsControl.Description));
    }
  }, [dispatch, locationURL.search]);

  useEffect(() => {
    handleScrollTopClick();
  }, []);

  useEffect(() => {
    dispatch(fetchSimilarAction(cameraId));
    dispatch(fetchCameraAction(cameraId));
    dispatch(fetchReviewsAction(cameraId));
  },[cameraId, dispatch]);

  if(!selectedProduct){
    return <LoadingPage />;
  }

  const handleBuyClick = () => {
    dispatch(selectProduct(selectedProduct));
    dispatch(modalBuy(!isModalBuy));
  };

  if(isModalBuy === true || isModalReview === true || isModalSuccess === true){
    body?.classList.add('scroll-lock');
  } else {
    body?.classList.remove('scroll-lock');
  }

  return (
    <div className="wrapper" data-testid='product-testid'>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={'/'}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{`${selectedProduct.category} ${selectedProduct.name}`}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${selectedProduct.previewImgWebp}, ${selectedProduct.previewImgWebp2x} 2x`} /><img src={`${selectedProduct.previewImg}`} srcSet={`${selectedProduct.previewImg2x} 2x`} width="560" height="480" alt={`${selectedProduct.name}`} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{selectedProduct.name}</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{selectedProduct.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(selectedProduct.price)} ₽</p>
                  <button className="btn btn--purple" type="button" onClick={() => handleBuyClick()}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <Link className={`tabs__control ${currentTabControl === TabsControl.Specifications ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => dispatch(selectTabsControl(TabsControl.Specifications))}
                        to={'?specifications'}
                      >Характеристики
                      </Link>
                      <Link className={`tabs__control ${currentTabControl === TabsControl.Description ? 'is-active' : ''}`}
                        type="button"
                        onClick={() => dispatch(selectTabsControl(TabsControl.Description))}
                        to={'?description'}
                      >Описание
                      </Link>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${currentTabControl === TabsControl.Specifications ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {selectedProduct.vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{selectedProduct.category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{selectedProduct.type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{selectedProduct.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${currentTabControl === TabsControl.Description ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>{selectedProduct.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          { similarCameras.length && <Similar cameras={similarCameras}/>}
          { reviews.length && <Reviews />}
        </div>
      </main>
      <button type='button' className="up-btn" onClick={() => handleScrollTopClick()}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      { isModalBuy && <ModalBuy />}
      { isModalReview && <ModalReview />}
      { isModalSuccess && <ModalSuccess />}
      <Footer />
    </div>
  );
}
