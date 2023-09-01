import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../store/services/api';
import { State } from '../../types/state';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks';
import { AppRoute, NameSpace, TabsControl } from '../../conts';
import { generatePath } from 'react-router-dom';
import { productsAdapter } from '../../store/basket-process/basket-process';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const camera = makeFakeCamera();
const cameras = [makeFakeCamera()];
const similarCameras = [makeFakeCamera()];
const promo = makeFakePromo();
const reviews = [makeFakeReview()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.Catalog]: {
    cameras: cameras,
    isLoading: false,
    isError: false,
    promo: promo,
    product: camera,
    isModalBuy: false,
    isModalReview: false,
    isModalSuccess: false,
  },
  [NameSpace.Product]: {
    similarCameras: similarCameras,
    currentTabControl: TabsControl.Description,
    reviews: reviews,
  },
  [NameSpace.Filters]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: 0,
  },
  [NameSpace.Basket]: {
    ...productsAdapter.getInitialState(),
    basketCameras: [makeFakeBasketCamera()],
    isLoading: false,
    isError: false,
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    coupon: 0,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByTestId('catalog-testid')).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByTestId('basket-testid')).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/1"', () => {
    history.push(generatePath(AppRoute.Product,{ id : '1' }));

    render(fakeApp);

    expect(screen.getByTestId('product-testid')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/not-founded-page');

    render(fakeApp);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
