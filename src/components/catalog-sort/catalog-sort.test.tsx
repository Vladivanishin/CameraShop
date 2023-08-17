import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { NameSpace } from '../../conts';
import { makeFakeCamera, makeFakePromo } from '../../mocks';
import CatalogSort from './catalog-sort';
import { Provider } from 'react-redux';

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
  }
});

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort cameras={[camera]}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
