import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../conts';
import { makeFakeCamera, makeFakePromo } from '../../../mocks';
import HistoryRouter from '../../history-route/history-route';
import BasketItem from './basket-item';

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

describe('Component: BasketEmpty', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem camera={camera}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('basket-item')).toBeInTheDocument();
  });

});
