import { useEffect, useMemo, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasWithRating, getCurrentCameras, getLoadingStatus, getModalBuyStatus, getPromo, getSelectedSortOrder, getSelectedSortType } from '../../store/catalog-process/selectors';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';
import LoadingPage from '../loading-page/loading-page';
import { Link, generatePath, useSearchParams } from 'react-router-dom';
import { AppRoute, CameraCategory, CameraLevel, CameraType, SortOrder, SortType, sortOrderQueryValue } from '../../conts';
import ModalBuy from '../../components/modal-buy/modal-buy';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import { selectSortOrder, selectSortType, setCamerasWithRating, setCurrentCameras } from '../../store/catalog-process/catalog-process';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../../store/filters-process/selectors';
import { changeCategory, changeLevel, changeType, setMaxPrice, setMinPrice } from '../../store/filters-process/filters-process';
import { QueryParam } from '../../types/query-param';
import { capitalizeFirstLetter, getRatingCameras } from '../../utils';

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
  const camerasWithRating = useAppSelector(getCamerasWithRating);
  console.log('camerasWithRating', camerasWithRating);
  const currentCameras = useAppSelector(getCurrentCameras);
  console.log('currentCameras', currentCameras);
  // console.log('cameras', cameras);



  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');

  const category = searchParams.get('category');
  const type: string[] = [];
  const level: string[] = [];
  const priceGte = searchParams.get('price_gte');
  const priceLte = searchParams.get('price_lte');

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

    if (currentSortOrder && currentSortType) {
      params.sortBy = currentSortType;
      params.order = sortOrderQueryValue[currentSortOrder];
    } else if (!currentCategory && !currentTypes.length && !currentLevels.length && !currentMinPrice && !currentMaxPrice) {
      return;
    }
    if (currentCategory) { params.category = currentCategory; }
    if (currentTypes) { params.type = currentTypes; }
    if (currentLevels) { params.level = currentLevels; }
    if (currentMinPrice) { params['price_gte'] = currentMinPrice.toString(); }
    if (currentMaxPrice) { params['price_lte'] = currentMaxPrice.toString(); }

    return params;
  }, [currentSortType, currentSortOrder, currentCategory, currentTypes, currentLevels, currentMinPrice, currentMaxPrice]);

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

  // const [currentCameras, setCurrentCameras] = useState(cameras);
  const [filteredCameras, setFilteredCameras] = useState(cameras);
  console.log('filteredCameras',filteredCameras);

  useEffect(() => {
    if(!filteredCameras){
      setFilteredCameras(camerasWithRating);
    }
  },[filteredCameras]);

  useEffect(() => {
    const ratingsCameras = getRatingCameras(cameras);
    dispatch(setCamerasWithRating(ratingsCameras));
  },[cameras]);

  useEffect(() => {
    const filtersCameras = camerasWithRating.filter((camera) => {
      if (currentMinPrice > camera.price || currentMaxPrice < camera.price) {
        return false;
      }
      if (currentCategory !== null && !currentCategory.includes(camera.category)) {
        return false;
      }
      if (currentTypes.length > 0 && !currentTypes.includes(camera.type)) {
        return false;
      }
      if (currentLevels.length > 0 && !currentLevels.includes(camera.level)) {
        return false;
      }
      return true;
    });
    // const ratingsCameras = getRatingCameras(filtersCameras);
    setFilteredCameras(filtersCameras);
    // dispatch(setCamerasWithRating(ratingsCameras));
  },[cameras, currentCategory, currentLevels, currentMaxPrice, currentMinPrice, currentTypes]);

  useEffect(() => {
    if(currentSortType === null && currentSortOrder !== null){
      dispatch(selectSortType(SortType.Price));
    }

    if (currentSortType !== null && currentSortOrder === null){
      dispatch(selectSortOrder(SortOrder.UP));
    }
    // const ratingsCameras = getRatingCameras(filteredCameras);
    const sorted = filteredCameras.sort((a, b) => {
      if (a.rating !== undefined && b.rating !== undefined) {
        if (currentSortType === SortType.Price) {
          if (currentSortOrder === SortOrder.UP) {
            return a.price - b.price;
          } else if (currentSortOrder === SortOrder.Down) {
            return b.price - a.price;
          }
        } else if (currentSortType === SortType.Popular) {
          if (currentSortOrder === SortOrder.UP) {
            return a.rating - b.rating;
          } else if (currentSortOrder === SortOrder.Down) {
            return b.rating - a.rating;
          }
        }
      }
      return 0;
    });
    dispatch(setCurrentCameras(sorted));
  }, [currentSortType, currentSortOrder, filteredCameras]);

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

  // eslint-disable-next-line no-console
  // console.log('currentCameras', currentCameras);


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
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogAside />
                <CatalogSort cameras={currentCameras}/>
              </div>
            </div>
          </section>
        </div>
        { isModalActive && <ModalBuy />}
      </main>
      <Footer />
    </div>
  );
}
