import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, TabsControl } from '../../conts';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks';
import Pagination from './pagination';

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
const currentPage = 1;
const pageCount = 5;


describe('Component: pagination', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination currentPage={currentPage} pageCount={pageCount} />
          <h3>pagination</h3>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/pagination/i)).toBeInTheDocument();
  });

});
