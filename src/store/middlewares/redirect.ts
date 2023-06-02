import { PayloadAction } from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '..';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'user/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
