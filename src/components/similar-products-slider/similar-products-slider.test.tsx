import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, TabsControl } from '../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks';
import SimilarProductsSlider from './similar-products-slider';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Catalog]: {
    cameras: [makeFakeCamera()],
    isLoading: false,
    isError: false,
    promo: makeFakePromo(),
    product: makeFakeCamera(),
    isModalBuy: false,
    isModalReview: false,
    isModalSuccess: false,
  },
  [NameSpace.Product]: {
    similarCameras: [makeFakeCamera()],
    currentTabControl: TabsControl.Description,
    reviews: [makeFakeReview()],
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

describe('Component: slider', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarProductsSlider cameras={[makeFakeCamera()]}/>
          <h3>slider</h3>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/slider/i)).toBeInTheDocument();
  });

});
