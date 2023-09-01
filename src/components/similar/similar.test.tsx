import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, TabsControl } from '../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks';
import Similar from './similar';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const cameras = [makeFakeCamera()];
const store = mockStore({
  [NameSpace.Catalog]: {
    cameras: cameras,
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


describe('Component: Similar', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Similar cameras={cameras}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('similar')).toBeInTheDocument();
  });

});
