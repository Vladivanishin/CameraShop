import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace } from '../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo } from '../../mocks';
import SimilarCard from './similar-card';

window.scrollTo = jest.fn();

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
    isError: null,
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    coupon: 0,
  }
});

describe('Component: SimilarCard', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarCard camera={camera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('similar-card')).toBeInTheDocument();
  });

});
