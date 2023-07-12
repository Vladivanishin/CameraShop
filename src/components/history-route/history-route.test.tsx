import { render, screen, act } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';

const history = createMemoryHistory();
describe('Component: History-route', () => {
  it('component should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <h1>History component</h1>
      </HistoryRouter>
    );

    expect(screen.getByText(/History component/i)).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    history.push('/current');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={'/current'}
            element={<h1>Current component</h1>}
          />
          <Route
            path={'/next'}
            element={<h1>Next component</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    act(() => history.push('/next'));

    expect(screen.getByText(/Next component/i)).toBeInTheDocument();
  });
});
