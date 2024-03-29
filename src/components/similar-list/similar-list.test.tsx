import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, TabsControl } from '../../conts';
import { makeFakeBasketCamera, makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks';
import SimilarList from './similar-list';

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
    isError: false,
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    coupon: 0,
  },
});


describe('Component: SimilarList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarList cameras={[makeFakeCamera()]}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('similar-list')).toBeInTheDocument();
  });

});
