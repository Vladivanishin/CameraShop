import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import { NameSpace, TabsControl } from '../../../conts';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../../mocks';
import Modal from './modal';

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
let isOpen = true;
const onClose = () => {
  isOpen = !isOpen;
};
describe('Component: Modal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Modal isOpen={isOpen} onClose={onClose}>
            <h3>modal</h3>
          </Modal>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

});
