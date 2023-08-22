import { useEffect, useMemo } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCurrentPage, getLoadingStatus, getModalBuyStatus, getPromo, getSelectedSortOrder, getSelectedSortType } from '../../store/catalog-process/selectors';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';
import LoadingPage from '../loading-page/loading-page';
import { Link, generatePath, useSearchParams } from 'react-router-dom';
import { AppRoute, CameraCategory, CameraLevel, CameraType, DEFAULT_PAGINATION_PAGE, SortOrder, SortType, sortOrderQueryValue } from '../../conts';
import ModalBuy from '../../components/modal-buy/modal-buy';
import { selectSortOrder, selectSortType, setCurrentPage } from '../../store/catalog-process/catalog-process';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../../store/filters-process/selectors';
import { changeCategory, changeLevel, changeType, setMaxPrice, setMinPrice } from '../../store/filters-process/filters-process';
import { QueryParam } from '../../types/query-param';
import { capitalizeFirstLetter } from '../../utils';
import CatalogSection from '../../components/catalog/catalog-section/catalog-section';
import BreadcrumbsMain from '../../components/breadcrumbs/breadcrumbs-main/breadcrumbs-main';

const body = document.querySelector('body');

export default function CatalogPage () : JSX.Element{
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoadingStatus);
  const promo = useAppSelector(getPromo);
  const isModalActive = useAppSelector(getModalBuyStatus);
  const cameras = useAppSelector(getCameras);
  const currentSortOrder = useAppSelector(getSelectedSortOrder);
  const currentSortType = useAppSelector(getSelectedSortType);
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentLevels = useAppSelector(getCurrentLevels);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);
  const currentPage = useAppSelector(getCurrentPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');

  const category = searchParams.get('category');
  const type: string[] = [];
  const level: string[] = [];
  const priceGte = searchParams.get('price_gte');
  const priceLte = searchParams.get('price_lte');
  const page = searchParams.get('page');

  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !type.includes(value)) {
      type.push(value);
    }

    if (key === 'level' && !level.includes(value)) {
      level.push(value);
    }

  }

  const currentParams = useMemo(() => {
    const params: QueryParam = {};
    if(currentPage === null){
      dispatch(setCurrentPage(DEFAULT_PAGINATION_PAGE));
    }
    if (currentSortOrder && currentSortType && currentPage) {
      params.sortBy = currentSortType;
      params.page = currentPage.toString();
      params.order = sortOrderQueryValue[currentSortOrder];
    } else if (!currentCategory && !currentTypes.length && !currentLevels.length && !currentMinPrice && !currentMaxPrice) {
      return;
    }
    if (currentCategory) { params.category = currentCategory; }
    if (currentTypes) { params.type = currentTypes; }
    if (currentLevels) { params.level = currentLevels; }
    if (currentPage) { params.page = currentPage.toString(); }
    if (currentMinPrice) { params['price_gte'] = currentMinPrice.toString(); }
    if (currentMaxPrice) { params['price_lte'] = currentMaxPrice.toString(); }

    return params;
  }, [currentSortType, currentSortOrder, currentCategory, currentTypes, currentLevels, currentMinPrice, currentMaxPrice, currentPage]);

  useEffect(() => {
    if(page !== currentPage && currentPage !== null && page !== null){
      dispatch(setCurrentPage(Number(page)));
    }
  },[page]);

  useEffect(() => {
    if(currentSortType === null && currentSortOrder !== null){
      dispatch(selectSortType(SortType.Price));
    }

    if (currentSortType !== null && currentSortOrder === null){
      dispatch(selectSortOrder(SortOrder.UP));
    }
  },[currentSortType, currentSortOrder]);

  useEffect(() => {
    if (sortType && sortOrder) {
      dispatch(selectSortType(sortType as SortType));
      dispatch(selectSortOrder(sortOrder === sortOrderQueryValue[SortOrder.UP] ? SortOrder.UP : SortOrder.Down));
    }
  }, [sortType, sortOrder, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(changeCategory(capitalizeFirstLetter(category) as CameraCategory));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (priceGte) {
      dispatch(setMinPrice(+priceGte));
    }

    if (priceLte) {
      dispatch(setMaxPrice(+priceLte));
    }
  }, [priceGte, priceLte, dispatch]);

  useEffect(() => {
    if (type.length) {
      type.forEach((item) => {
        dispatch(changeType(capitalizeFirstLetter(item) as CameraType));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (level.length) {
      level.forEach((item) => {
        dispatch(changeLevel(capitalizeFirstLetter(item) as CameraLevel));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  useEffect(() => {
    if(cameras.length === 0){
      dispatch(fetchCamerasAction());
    }
    dispatch(fetchPromoAction());
  },[dispatch]);

  if(isLoading){
    return <LoadingPage />;
  }

  if(!promo || cameras.length === 0){
    return <LoadingPage />;
  }

  function handleCardClick() {
    dispatch(fetchCameraAction(promo!.id));
  }

  if(isModalActive === true){
    body?.classList.add('scroll-lock');
  } else {
    body?.classList.remove('scroll-lock');
  }

  return (
    <div className="wrapper" data-testid='catalog-testid'>
      <Header />
      <main>
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`} /><img src="img/content/banner-bg.jpg" srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
          </picture>
          <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promo.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><Link className="btn" to={generatePath(AppRoute.Product, {id: `${promo.id}`})} onClick={() => handleCardClick()}>Подробнее</Link></p>
        </div>
        <div className="page-content">
          <BreadcrumbsMain />
          <CatalogSection />
        </div>
        { isModalActive && <ModalBuy />}
      </main>
      <Footer />
    </div>
  );
}
