import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { State } from '../../types/state';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should not to be redirect to any because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: '*' });
    expect(fakeHistory.location.pathname).not.toBe('*');
  });
});
