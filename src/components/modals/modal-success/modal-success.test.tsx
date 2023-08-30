import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import { NameSpace, TabsControl } from '../../../conts';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../../mocks';
import ModalSuccess from './modal-success';
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

describe('Component: ModalSuccess', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalSuccess />
        </HistoryRouter>
      </Provider>
    );

    userEvent.tab();

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });

});
