import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import { NameSpace } from '../../../conts';
import { makeFakeCamera, makeFakePromo } from '../../../mocks';
import CatalogSection from './catalog-section';

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

describe('Component: CatalogSection', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSection />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('catalog-section')).toBeInTheDocument();
  });
});
