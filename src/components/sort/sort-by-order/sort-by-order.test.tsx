import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../../mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, TabsControl } from '../../../conts';
import SortByOrder from './sort-by-order';

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
});

describe('Component: SortByOrder', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortByOrder />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sort-by-order')).toBeInTheDocument();
  });
});
