import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo } from '../../../mocks';
import HistoryRouter from '../../history-route/history-route';
import BasketPromo from './basket-promo';

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
    basketCameras: [makeFakeBasketCamera()],
    isLoading: false,
    isError: false,
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    coupon: 0,
  },
});

describe('Component: BasketPromo', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketPromo />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('basket-promo')).toBeInTheDocument();
  });

});
