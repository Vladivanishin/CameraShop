import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import { NameSpace, TabsControl } from '../../../conts';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../../mocks';
import ModalBuy from './modal-buy';
import userEvent from '@testing-library/user-event';

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

describe('Component: ModalBuy', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalBuy />
        </HistoryRouter>
      </Provider>
    );

    userEvent.tab();

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });

});
