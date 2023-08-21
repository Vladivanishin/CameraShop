import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../../mocks';
import { NameSpace } from '../../../conts';
import { createMemoryHistory } from 'history';
import FilterCategory from './filter-category';
import HistoryRouter from '../../history-route/history-route';

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
    sortType: null,
    sortOrder: null,
  },
  [NameSpace.Filters]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: 0,
  }

});

describe('Component: FilterCategory', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterCategory />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('filter-category')).toBeInTheDocument();
  });
});
