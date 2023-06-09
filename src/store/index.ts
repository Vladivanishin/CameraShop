import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { redirect } from './middlewares/redirect';
import { NameSpace } from '../conts';
import { catalogProcess } from './catalog-process/catalog-process';
import { basketProcess } from './basket-process/basket-process';
import { productProcess } from './product-process/product-process';

const api = createAPI();

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess.reducer,
  [NameSpace.Basket]: basketProcess.reducer,
  [NameSpace.Product]: productProcess.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
