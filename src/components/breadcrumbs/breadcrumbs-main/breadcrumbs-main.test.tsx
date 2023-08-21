import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import BreadcrumbsMain from './breadcrumbs-main';
import HistoryRouter from '../../history-route/history-route';

const history = createMemoryHistory();

describe('Component: breadcrumbs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BreadcrumbsMain/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
