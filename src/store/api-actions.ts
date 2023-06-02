import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cameras } from '../types/catalog';
import { APIRoute } from '../conts';
import { notify } from '../utils';

type ThunkConfig = {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  undefined,
  ThunkConfig
>('fetchCamerasAction', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: cameras } = await api.get<Cameras>(APIRoute.Cameras);
    return cameras;
  } catch (error) {
    notify('Массив объектов, описывающих товары магазина не получен!');
    throw error;
  }
});
