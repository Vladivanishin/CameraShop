import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo } from '../../../mocks';
import HistoryRouter from '../../history-route/history-route';
import BasketOrder from './basket-order';
import { productsAdapter } from '../../../store/basket-process/basket-process';

const mockStore = configureMockStore();
const camera = makeFakeCamera();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Catalog]: {
    cameras: [camera],
    isLoading: false,
    isError: false,
    promo: makeFakePromo(),
    product: null,
    isModalBuy: false,
    isModalReview: false,
    isModalSuccess: false,
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
  [NameSpace.Filters]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: 0,
  },
});

describe('Component: BasketOrder', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketOrder />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('basket-order')).toBeInTheDocument();
  });

});
