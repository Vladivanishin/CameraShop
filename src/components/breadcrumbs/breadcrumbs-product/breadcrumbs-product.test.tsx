import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import BreadcrumbsProduct from './breadcrumbs-product';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../conts';
import { makeFakeCamera, makeFakePromo } from '../../../mocks';
import HistoryRouter from '../../history-route/history-route';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Catalog]: {
    cameras: [makeFakeCamera()],
    isLoading: false,
    isError: false,
    promo: makeFakePromo(),
    product: null,
    isModalBuy: false,
    isModalReview: false,
    isModalSuccess: false,
  }
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <BreadcrumbsProduct />
    </HistoryRouter>
  </Provider>
);

describe('Component: breadcrumbs product', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('breadcrumbs-product')).toBeInTheDocument();
  });
});
