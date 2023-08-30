import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import BreadcrumbsBasket from './breadcrumbs-basket';

const history = createMemoryHistory();

describe('Component: breadcrumbs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BreadcrumbsBasket/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
