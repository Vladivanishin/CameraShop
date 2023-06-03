import { Route, Routes } from 'react-router-dom';
import { browserHistory } from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { AppRoute } from '../../conts';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

export default function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={'/'} element={<CatalogPage />}/>
        <Route path={AppRoute.Catalog} element={<CatalogPage />}/>
        <Route path={'*'} element={<NotFoundPage />}/>
      </Routes>
    </HistoryRouter>
  );
}

