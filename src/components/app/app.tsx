import { Navigate, Route, Routes } from 'react-router-dom';
import { browserHistory } from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../conts';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';

export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={'/'} element={<Navigate replace to={AppRoute.Catalog} />} />
        <Route path={AppRoute.Catalog} element={<CatalogPage />}/>
        <Route path={AppRoute.Product} element={<ProductPage />}/>
        <Route path={AppRoute.Basket} element={<BasketPage />} />
        <Route path={'*'} element={<NotFoundPage />}/>
        {/* <Route path={'/'} element={<CatalogPage />}/> */}
      </Routes>
    </HistoryRouter>
  );
}

